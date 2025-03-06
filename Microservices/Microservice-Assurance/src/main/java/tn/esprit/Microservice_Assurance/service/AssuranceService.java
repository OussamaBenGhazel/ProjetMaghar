package tn.esprit.Microservice_Assurance.service;

import tn.esprit.Microservice_Assurance.model.Assurance;

import java.util.List;

public interface AssuranceService {
    Assurance createAssurance(Assurance assurance);
    Assurance updateAssurance(Long id, Assurance assurance);
    void deleteAssurance(Long id);
    List<Assurance> getAllAssurances();
    Assurance getAssuranceById(Long id);
}

