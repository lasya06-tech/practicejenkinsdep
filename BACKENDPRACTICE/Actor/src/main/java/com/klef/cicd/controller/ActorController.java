package com.klef.cicd.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import com.klef.cicd.entity.Actor;
import com.klef.cicd.service.ActorService;

@RestController
@RequestMapping("/actorapi")
@CrossOrigin(origins = "*")
public class ActorController {

    @Autowired
    private ActorService actorService;

    @GetMapping("/")
    public String home() {
        return "Actor Management API is running!";
    }

    // Add Actor
    @PostMapping("/add")
    public ResponseEntity<Actor> addActor(@RequestBody Actor actor) {
        Actor savedActor = actorService.addActor(actor);
        return new ResponseEntity<>(savedActor, HttpStatus.CREATED);
    }

    // Get All Actors
    @GetMapping("/all")
    public ResponseEntity<List<Actor>> getAllActors() {
        List<Actor> actors = actorService.getAllActors();
        return new ResponseEntity<>(actors, HttpStatus.OK);
    }

    // Get Actor By ID
    @GetMapping("/get/{id}")
    public ResponseEntity<?> getActorById(@PathVariable("id") int id) {
        Actor actor = actorService.getActorById(id);
        if (actor != null) {
            return ResponseEntity.ok(actor);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("error", "Actor with ID " + id + " not found"));
        }
    }


    // Update Actor
    @PutMapping("/update")
    public ResponseEntity<?> updateActor(@RequestBody Actor actor) {
        Actor existing = actorService.getActorById(actor.getId());
        if (existing != null) {
            Actor updatedActor = actorService.updateActor(actor);
            return new ResponseEntity<>(updatedActor, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Cannot update. Actor with ID " + actor.getId() + " not found.", HttpStatus.NOT_FOUND);
        }
    }

    // Delete Actor
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteActor(@PathVariable int id) {
        Actor existing = actorService.getActorById(id);
        if (existing != null) {
            actorService.deleteActorById(id);
            return new ResponseEntity<>("Actor with ID " + id + " deleted successfully.", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Cannot delete. Actor with ID " + id + " not found.", HttpStatus.NOT_FOUND);
        }
    }
}
