package com.klef.cicd.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.klef.cicd.entity.Actor;

@Repository
public interface ActorRepository extends JpaRepository<Actor, Integer> {
    Actor findByName(String name);
    Actor findByGender(String gender);
}