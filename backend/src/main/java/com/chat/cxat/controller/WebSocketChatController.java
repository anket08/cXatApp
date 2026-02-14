package com.chat.cxat.controller;

import com.chat.cxat.model.Message;
import com.chat.cxat.service.ChatService;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;

@Controller
public class WebSocketChatController {

    private final ChatService chatService;
    private final SimpMessagingTemplate messagingTemplate;

    public WebSocketChatController(ChatService chatService, SimpMessagingTemplate messagingTemplate) {
        this.chatService = chatService;
        this.messagingTemplate = messagingTemplate;
    }

    @MessageMapping("/chat")
    public void send(Message message) {
        // save message in DB
        Message savedMessage = chatService.sendMessage(message);
        // dynamicaly route to room topic
        messagingTemplate.convertAndSend("/topic/messages/" + savedMessage.getRoomId(), savedMessage);
    }
}