package tn.esprit.partenaireservice.FeignClient;



import org.apache.catalina.User;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import tn.esprit.partenaireservice.Entity.UserDTO;

@FeignClient(name = "Usermicro", url = "http://localhost:8090")
    public interface UserClient {
        @GetMapping("/user-service/users/{id}")
        UserDTO getUserById(@PathVariable("id") Long id);
    }