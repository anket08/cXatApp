package com.chat.cxat.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.time.ZoneOffset;

@Document(collection = "messages")
public class Message {

    @Id
    private String id;

    private String roomId;
    private String senderId;
    private String content;

    // UTC timestamp
    private LocalDateTime createdAt =
            LocalDateTime.now(ZoneOffset.UTC);


    // ======================
    // Default Constructor
    // Required for MongoDB & Redis
    // ======================
    public Message() {}


    // ======================
    // Getters
    // ======================

    public String getId() {
        return id;
    }

    public String getRoomId() {
        return roomId;
    }

    public String getSenderId() {
        return senderId;
    }

    public String getContent() {
        return content;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }


    // ======================
    // Setters
    // ======================

    public void setId(String id) {
        this.id = id;
    }

    public void setRoomId(String roomId) {
        this.roomId = roomId;
    }

    public void setSenderId(String senderId) {
        this.senderId = senderId;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}