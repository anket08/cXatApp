package com.chat.cxat.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor

@Document(collection = "chat_rooms")
public class ChatRoom {

    @Id
    private String id;   // 4-digit room code

    private String name;
    private String type;
    private LocalDateTime createdAt = LocalDateTime.now();

    
}