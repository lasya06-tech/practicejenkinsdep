package com.klef.cicd.service;

import java.util.List;
import com.klef.cicd.entity.Actor;

public interface ActorService {
    Actor addActor(Actor actor);
    List<Actor> getAllActors();
    Actor getActorById(int id);
    Actor updateActor(Actor actor);
    void deleteActorById(int id);
}