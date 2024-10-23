# Knowledge Repository
![Python](https://img.shields.io/badge/Python-FFD43B?style=for-the-badge&logo=python&logoColor=blue)
![Docker](https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white)

**Knowledge Repository** is a platform to organize and share useful information.

## Planned Features

- **Knowledge Base**: Keep your knowledge in one place
- **Search**: Find information quickly.
- **Docker Support**: Deploy with docker

## Getting Started

### Prerequisites

- **Python 3.9+**
- **Docker**

### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/KnowledgeRepo.git
   cd KnowledgeRepo
   ```

2. **Install Dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **Run the Application**
   ```bash
   uvicorn app.main:app --reload
   ```
   The app will be available at [http://localhost:8000](http://localhost:8000).

### Running with Docker

1. **Build the Docker Image**
   ```bash
   docker build -t knowledge-repo .
   ```

2. **Run the Docker Container**
   ```bash
   docker run -p 8000:8000 knowledge-repo
   ```

## Usage

- Access the main page at [http://localhost:8000](http://localhost:8000).

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.
