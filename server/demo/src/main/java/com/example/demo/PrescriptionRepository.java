package com.example.demo;

import org.springframework.data.repository.CrudRepository;

import com.example.demo.Prescription;
import org.springframework.stereotype.Repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface PrescriptionRepository extends CrudRepository<Prescription, Integer>{
    //List<User> findByName(String Name);

    List<Prescription> findByPid(int id);

    List<Prescription> findById(int id);

//    @Modifying
//    @Query("insert into pid_prescription values(?1,?2,?3,?4)")
//    public int setNewTodo(Integer id, Long issue_date, String content, boolean status);
}

