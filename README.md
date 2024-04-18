
# ProteinPulse

ProteinPulse is an advanced tool that automates the creation of custom proteins with randomized amino acid sequences. It allows researchers to specify sequence length, identify preferred and avoided amino acids, and determine the number of proteins to generate. This accelerates studies in protein structure, function, and drug discovery, making it indispensable for molecular biology research.
## Run Locally

Clone the project

```bash
  git clone https://github.com/im-sparrow05/proteinpulse.git
```

Go to the project directory

```bash
  cd proteinpulse
```

Go to the backend directory

```bash
  cd backend
```

Install node dependencies

```bash
  npm install
```

Start the backend server

```bash
  node server.js
```

#### Now, our backend server is live on port 5000. Let deploy the frontend App

##### open a new terminal

Go to the project directory

```bash
  cd proteinpulse
```

Go to the frontend directory

```bash
  cd frontend
```

Install node dependencies

```bash
  npm install
```

Start the frontend server

```bash
  npm start
```

### Now, frontend is deployed on localhost:3000, now our app is ready to use








## Usage

1. **Enter Size of Amino Acid Sequences**: Specify the length of the amino acid sequences you want for each protein. Input a numerical value representing the length of the sequence (e.g., 10).

2. **Avoid Specific Amino Acids** (Optional): If you want to exclude certain amino acids from the sequences, enter their single-letter codes separated by spaces. This step is optional.

3. **Specify Number of Proteins**: Enter the number of proteins you want to generate. Provide a numerical value representing the total number of proteins you want (e.g., 10000).

4. **Generate Protein Data**: Click the 'Generate Protein Data' button to initiate the process. After clicking the button, you will download a .zip file containing the specified number of .pdb files. Each .pdb file will contain a protein with a random amino acid sequence of the specified length, avoiding the specified amino acids (if provided).
# Requirements

## Packages

- Node.js >= 14.0.0
- npm >= 6.0.0

## System Requirements

- Ubuntu >= 22.04 (recommended)

(Note: Linux OS is preferred. For Windows, consider using WSL. For macOS, consider using VirtualBox.)
