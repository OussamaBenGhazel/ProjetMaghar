package tn.esprit.Microservice_Rendezvous;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service

public class ClientService {

    @Autowired
    private ClientRepository clientRepository;

    public Client creerClient(Client client) {
        return clientRepository.save(client);
    }
}
