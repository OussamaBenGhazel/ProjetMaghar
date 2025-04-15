import spacy
from pyresparser import ResumeParser

nlp = spacy.load("en_core_web_sm")
print("Spacy fonctionne !")
parser = ResumeParser("D:\test_cv.pdf")  # Remplace par un chemin réel
data = parser.get_extracted_data()
print("Pyresparser fonctionne !", data)