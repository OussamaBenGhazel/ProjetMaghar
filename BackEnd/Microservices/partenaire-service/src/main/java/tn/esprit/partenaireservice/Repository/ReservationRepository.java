package tn.esprit.partenaireservice.Repository;


<<<<<<< HEAD
import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.partenaireservice.Entity.Reservation;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {
}

=======

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import tn.esprit.partenaireservice.Entity.Reservation;

import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {

    @Query("SELECT o.typeOffre, COUNT(r) as count FROM Reservation r JOIN r.offrepartenaire o GROUP BY o.typeOffre ORDER BY count DESC")
    List<Object[]> countReservationsByOffreType();

    @Query("SELECT DISTINCT o.typeOffre FROM OffrePartenaire o")
    List<String> findAllDistinctOfferTypes();

    @Query("SELECT FUNCTION('MONTH', r.dateReservation), COUNT(r) FROM Reservation r GROUP BY FUNCTION('MONTH', r.dateReservation)")
    List<Object[]> countReservationsByMonth();
}
>>>>>>> f66f6dbf7e51f5605863b8a16a767699713241e8
