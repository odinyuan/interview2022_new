package com.example.demo;

import org.springframework.data.repository.CrudRepository;

import com.example.demo.User;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends CrudRepository<User, Integer>{
    //List<User> findByName(String Name);

    List<User> findById(int id);
}

