package tn.esprit.partenaireservice.Repository;


import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.partenaireservice.Entity.Reservation;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {
}

