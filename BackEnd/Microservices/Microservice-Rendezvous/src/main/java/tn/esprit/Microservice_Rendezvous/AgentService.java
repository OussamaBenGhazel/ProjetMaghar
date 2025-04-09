package tn.esprit.Microservice_Rendezvous;

import org.aspectj.weaver.loadtime.Agent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AgentService {

    @Autowired
    private AgentRepository agentRepository;

    public AgentAssurance creerAgent(AgentAssurance agentAssurance) {
        return agentRepository.save(agentAssurance);
    }
}