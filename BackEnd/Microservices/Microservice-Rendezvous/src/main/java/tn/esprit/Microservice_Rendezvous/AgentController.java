package tn.esprit.Microservice_Rendezvous;

import org.aspectj.weaver.loadtime.Agent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/agents")
public class AgentController {
    @Autowired
    private AgentService agentService;

    @PostMapping
    public AgentAssurance creerAgent(@RequestBody AgentAssurance agentAssurance) {
        return agentService.creerAgent(agentAssurance);
    }
}
