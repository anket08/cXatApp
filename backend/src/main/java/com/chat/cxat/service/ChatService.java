package com.chat.cxat.service;

import com.chat.cxat.model.ChatRoom;
import com.chat.cxat.model.Message;
import com.chat.cxat.repository.ChatRoomRepository;
import com.chat.cxat.repository.MessageRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Random;

@Service
public class ChatService {

    private final ChatRoomRepository chatRoomRepository;
    private final MessageRepository messageRepository;

    public ChatService(ChatRoomRepository chatRoomRepository,
                       MessageRepository messageRepository) {
        this.chatRoomRepository = chatRoomRepository;
        this.messageRepository = messageRepository;
    }

    // CREATE ROOM WITH RANDOM 4-DIGIT ID
    public ChatRoom createPrivateRoom() {
        String roomId = generateUniqueRoomId();

        ChatRoom room = new ChatRoom();
        room.setId(roomId);
        room.setType("PRIVATE");

        return chatRoomRepository.save(room);
    }

    // RANDOM 4-DIGIT UNIQUE ID (STRING)
    private String generateUniqueRoomId() {
        Random random = new Random();
        String roomId;

        do {
            int number = 1000 + random.nextInt(9000); // 1000–9999
            roomId = String.valueOf(number);
        } while (chatRoomRepository.existsById(roomId));

        return roomId;
    }

    public Message sendMessage(Message message) {
        return messageRepository.save(message);
    }

    public boolean roomExists(String roomId) {
        return chatRoomRepository.existsById(roomId);
    }

    public List<Message> getMessages(String roomId) {
        return messageRepository.findByRoomIdOrderByCreatedAtAsc(roomId);
    }
}