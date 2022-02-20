package com.example.demo;

import org.springframework.data.repository.CrudRepository;

import com.example.demo.User;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LoginRepository extends CrudRepository<Login, Integer>{
    //List<User> findByName(String Name);

    boolean existsByIdAndPasswd(int id,String passwd);
}
