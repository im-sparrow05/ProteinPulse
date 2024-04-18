const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { exec } = require('child_process');
const fs = require('fs');
const archiver = require('archiver');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

const PHI_RANGE = [-135, 135];
const PSI_RANGE = [-45, 45];
const AA_CODES = {
    "A": "ALA", "R": "ARG", "N": "ASN", "D": "ASP", "C": "CYS",
    "Q": "GLN", "E": "GLU", "G": "GLY", "H": "HIS", "I": "ILE",
    "L": "LEU", "K": "LYS", "M": "MET", "F": "PHE", "P": "PRO",
    "S": "SER", "T": "THR", "W": "TRP", "Y": "TYR", "V": "VAL"
};

function pickRandomPhiPsi() {
    const phi = Math.random() < 0.5 ? randomInRange(-180, -40) : randomInRange(40, 100);
    const psi = Math.random() < 0.5 ? randomInRange(-180, -150) : randomInRange(-80, 180);
    return [phi.toFixed(2), psi.toFixed(2)];
}

function generateLine(aaList) {
    const res_aa = aaList[Math.floor(Math.random() * aaList.length)];
    const [phi, psi] = pickRandomPhiPsi();
    return `res ${res_aa} phi ${phi} psi ${psi}`;
}

function generateModel(numLines, excludeAa) {
    const aaList = Object.values(AA_CODES).filter(aa => !excludeAa.includes(aa));
    const modelData = [];
    for (let i = 0; i < numLines; i++) {
        modelData.push(generateLine(aaList));
    }
    return modelData;
}

function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
}
// app.get('/',(req,res)=>{
//     res.send("Welcome");
// })
app.post('/', (req, res) => {
    console.log("rah");
    const { num_lines, exclude_aa, num_models } = req.body;
    const excludeAa = exclude_aa.toUpperCase().split('').filter(char => char in AA_CODES);
    const zip = archiver('zip');
    res.attachment('protein_data.zip');
    zip.pipe(res);

    // Create an array to store promises
    const execPromises = [];
    const tempFilesToDelete = []; // Array to store temporary files to delete

    for (let i = 0; i < num_models; i++) {
        const filename = `protein_inputdata_${i}.rib`;
        const modelData = generateModel(num_lines, excludeAa);
        
        fs.writeFileSync(filename, `TITLE RIBOSOME 1\n${modelData.join('\n')}`);
        console.log(filename);
        const command = `./ribosome ${filename} protein_output_${i}.pdb res.zmat`;
        console.log(command);
        
        // Create a promise for each exec command and push it to the execPromises array
        execPromises.push(new Promise((resolve, reject) => {
            exec(command, (error, stdout, stderr) => {
                if (error) {
                    console.error(`Error executing command: ${error.message}`);
                    reject(error);
                } else if (stderr) {
                    console.error(`Error output from command: ${stderr}`);
                    reject(new Error(stderr));
                } else {
                    console.log(`Command output: ${stdout}`);
                    zip.file(`protein_output_${i}.pdb`, { name: `protein_output_${i}.pdb` });
                    tempFilesToDelete.push(filename, `protein_output_${i}.pdb`); // Add filenames to delete later
                    resolve();
                }
            });
        }));
    }

    // Wait for all promises to resolve
    // Wait for all promises to resolve
Promise.all(execPromises)
.then(() => {
    // All exec commands have completed successfully, finalize the zip
    zip.finalize();
    
    // Wait for a short delay to ensure files are created before accessing them
    setTimeout(() => {
        // Delete the temporary files
        tempFilesToDelete.forEach(file => {
            try {
                fs.unlinkSync(file);
                console.log(`Deleted file: ${file}`);
            } catch (err) {
                console.error(`Error deleting file ${file}: ${err.message}`);
            }
        });
    }, 1000); // Adjust the delay time as needed
})
.catch((error) => {
    // Handle any errors that occurred during exec commands
    console.error(`Error executing commands: ${error.message}`);
    res.status(500).send('Internal Server Error');
});

});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
