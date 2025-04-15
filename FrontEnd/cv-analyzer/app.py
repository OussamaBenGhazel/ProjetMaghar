from flask import Flask, request
import PyPDF2
import docx
import os

app = Flask(__name__)

@app.route('/analyze-cv', methods=['POST'])
def analyze_cv():
    try:
        if 'cvFile' not in request.files:
            return {"error": "Aucun fichier CV envoyé"}, 400

        file = request.files['cvFile']
        if file.filename == '':
            return {"error": "Nom de fichier vide"}, 400

        temp_dir = "temp_files"
        if not os.path.exists(temp_dir):
            os.makedirs(temp_dir)

        file_path = os.path.join(temp_dir, file.filename)
        file.save(file_path)

        text = ""
        if file.filename.endswith('.pdf'):
            with open(file_path, 'rb') as f:
                reader = PyPDF2.PdfReader(f)
                for page in reader.pages:
                    text += page.extract_text() or ""
        elif file.filename.endswith('.doc') or file.filename.endswith('.docx'):
            doc = docx.Document(file_path)
            for para in doc.paragraphs:
                text += para.text + "\n"
        else:
            os.remove(file_path)
            return {"error": "Format de fichier non supporté"}, 400

        keywords = ["java", "python", "spring", "angular"]
        skills_found = []
        for keyword in keywords:
            if keyword.lower() in text.lower():
                skills_found.append(keyword)

        analysis_result = {
            "skills_found": skills_found,
            "experience_years": 5,
            "meets_criteria": len(skills_found) > 2,
            "score": min(100, len(skills_found) * 25)
        }

        os.remove(file_path)
        return analysis_result, 200
    except Exception as e:
        print(f"Erreur lors de l'analyse : {str(e)}")
        if 'file_path' in locals() and os.path.exists(file_path):
            os.remove(file_path)
        return {"error": str(e)}, 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)