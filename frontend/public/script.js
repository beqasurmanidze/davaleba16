const socket = io();

const publicInput = document.getElementById("publicInput");
const messages = document.getElementById("messages");

if (publicInput) {
  publicInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      const msg = publicInput.value;
      socket.emit("publicMessage", msg);
      const li = document.createElement("li");
      li.textContent = `თქვენ: ${msg}`;
      messages.appendChild(li);
      publicInput.value = "";
    }
  });

  socket.on("publicMessage", (msg) => {
    const li = document.createElement("li");
    li.textContent = `სხვა: ${msg}`;
    messages.appendChild(li);
  });
}

const joinBtn = document.getElementById("joinBtn");
const emailInput = document.getElementById("email");
const roomIdInput = document.getElementById("roomId");
const roomInput = document.getElementById("roomInput");
const roomMessages = document.getElementById("roomMessages");
const chatRoom = document.getElementById("chatRoom");

if (joinBtn) {
  joinBtn.addEventListener("click", () => {
    const email = emailInput.value;
    const roomId = roomIdInput.value;

    if (email && roomId) {
      socket.emit("joinRoom", { roomId, email });
      document.getElementById("joinRoom").style.display = "none";
      chatRoom.style.display = "block";
    }
  });
}

if (roomInput) {
  roomInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      const msg = roomInput.value;
      socket.emit("roomMessage", msg);
      const li = document.createElement("li");
      li.textContent = `თქვენ: ${msg}`;
      roomMessages.appendChild(li);
      roomInput.value = "";
    }
  });

  socket.on("roomMessage", (msg) => {
    const li = document.createElement("li");
    li.textContent = msg;
    roomMessages.appendChild(li);
  });
}
