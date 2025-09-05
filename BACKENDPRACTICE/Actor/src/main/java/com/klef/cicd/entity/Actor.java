package com.klef.cicd.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "actor_table")
public class Actor {

    @Id
    @Column(name = "actor_id")
    private int id;

    @Column(name = "actor_name", nullable = false, length = 100)
    private String name;

    @Column(name = "actor_gender", nullable = false, length = 20)
    private String gender;

    @Column(name = "actor_experience", nullable = false)
    private int experience;

    @Column(name = "actor_top_remuneration", nullable = false, length = 50)
    private String topRemuneration;

    @Column(name = "actor_flop_movie", nullable = false, length = 100)
    private String flopMovie;

    // Getters & Setters
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getGender() { return gender; }
    public void setGender(String gender) { this.gender = gender; }

    public int getExperience() { return experience; }
    public void setExperience(int experience) { this.experience = experience; }

    public String getTopRemuneration() { return topRemuneration; }
    public void setTopRemuneration(String topRemuneration) { this.topRemuneration = topRemuneration; }

    public String getFlopMovie() { return flopMovie; }
    public void setFlopMovie(String flopMovie) { this.flopMovie = flopMovie; }

    @Override
    public String toString() {
        return "Actor [id=" + id + ", name=" + name + ", gender=" + gender +
               ", experience=" + experience + ", topRemuneration=" + topRemuneration +
               ", flopMovie=" + flopMovie + "]";
    }
}