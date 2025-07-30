// ============================================
// ИСПРАВЛЕННЫЙ МОДУЛЬ ЧАТА
// ============================================

const ChatModule = (function() {
    'use strict';
    
    // Core variables
    let db = null;
    let auth = null;
    let currentUser = null;
    let allMessages = [];
    let currentChannel = 'general';
    let currentChannelType = 'public'; // 'public' или 'private'
    let currentTab = 'messages';
    let channels = [];
    let privateChats = []; // Для хранения активных личных чатов
    let allUsers = new Map(); // Хранит всех пользователей
    let onlineUsers = new Map(); // Используем Map для хранения полной информации
    let unreadCounts = new Map();
    let isInitialized = false;
    let replyContext = null;
    let presenceListener = null;
    let heartbeatInterval = null; // Для "пульса"
    let emojiPicker = null;
    let notificationsEnabled = true;
    let originalTitle = document.title;
    let unreadMessageCount = 0; 
    let isPinnedMode = false;
    let messagesListener = null; // Cлушатель для сообщений
    let questionToHighlight = null;
    let favoritesListener = null;
    let unlockedChannels = new Set();
    const QUICK_REACTIONS_KEY = 'userQuickReactions';
    const DEFAULT_QUICK_REACTIONS = ['👍', '❤️', '😂', '😮', '😢', '🔥'];
    
    // DOM elements
    let chatOverlay = null;
    let chatModal = null;
    let currentUserEl = null;
    let chatInput = null;
    let messageArea = null;
    let channelsList = null;
    let privateChatsList = null; // Для списка ЛС
    let onlineUsersList = null;
    let searchInput = null;
    let authOverlay = null;
    let tabButtons = {};
    let tabCounters = {};
    
    // Tabs configuration
    const TABS = {
        messages: { name: 'Сообщения', icon: '💬', collection: 'messages' },
        questions: { name: 'Вопросы', icon: '❓', collection: 'questions' },
        favorites: { name: 'Избранное', icon: '⭐', collection: 'favorites' },
        users: { name: 'Пользователи', icon: '👥' } // Новый таб
    };

    function init(firebaseDb, firebaseAuth) {
        try {
            db = firebaseDb;
            auth = firebaseAuth;
            
            createHybridChatHTML();
            
            initDOMElements();
            setupEventListeners();
            setupAuthStateListener();
            setupVisibilityListener();
            
            isInitialized = true;
            console.log('✅ Гибридный чат инициализирован');
        } catch (error) {
            console.error('❌ Ошибка инициализации чата:', error);
            isInitialized = false;
        }
    }
    
    function createHybridChatHTML() {

        const oldChats = document.querySelectorAll('#chatOverlay, #advancedChatOverlay');
        oldChats.forEach(chat => chat.remove());
        
        const chatHTML = `
        <!-- СИСТЕМА АУТЕНТИФИКАЦИИ -->
        <div id="authOverlay" class="auth-overlay hidden">
            <div class="auth-modal">
                <h2 style="margin-bottom: 20px; color: var(--primary);">🔐 Авторизация</h2>
                <div class="auth-tabs">
                    <button class="auth-tab active" data-tab="login">Вход</button>
                    <button class="auth-tab" data-tab="register">Регистрация</button>
                </div>
                <form class="auth-form active" id="loginForm">
                    <input type="text" class="auth-input" id="loginUsername" placeholder="Имя пользователя или Email" required>
                    <input type="password" class="auth-input" id="loginPassword" placeholder="Пароль" required>
                    <button type="submit" class="auth-btn">Войти</button>
                </form>
                <form class="auth-form" id="registerForm">
                    <input type="text" class="auth-input" id="registerUsername" placeholder="Имя пользователя" required>
                    <input type="email" class="auth-input" id="registerEmail" placeholder="Email" required>
                    <input type="password" class="auth-input" id="registerPassword" placeholder="Пароль (минимум 6 символов)" required>
                    <button type="submit" class="auth-btn">Зарегистрироваться</button>
                </form>
                <button onclick="ChatModule.closeAuthModal()" style="margin-top: 15px; background: none; border: none; color: var(--secondary-text-color); cursor: pointer;">
                    Закрыть
                </button>
            </div>
        </div>

        <!-- ГИБРИДНЫЙ ЧАТ -->
        <div id="chatOverlay" class="advanced-chat-overlay hidden">
            <div class="advanced-chat-modal">
                <!-- Header -->

                <div class="advanced-chat-header">
                    <div class="chat-title">
                        <h3 id="chatHeaderTitle">💬 Чат</h3>
                        <span id="unreadBadge" class="unread-badge hidden">0</span>
                    </div>
                    <button id="sidebarToggleBtn" class="sidebar-toggle-btn">☰</button>

                    <div class="header-controls">
                        <div class="user-menu-container">
                            <span id="currentUser">Гость</span>
                            <div id="userDropdown" class="user-dropdown hidden">
                                <a href="#" onclick="ChatModule.showProfileModal()">✏️ Редактировать профиль</a>
                                <a href="#" onclick="ChatModule.logout()">🚪 Выйти</a>
                            </div>
                        </div>
                        <button id="notificationToggle" class="notification-toggle" title="Уведомления">🔔</button>
                        <button onclick="ChatModule.closeChatModal()" class="close-btn">×</button>
                    </div>
                </div>
                
                <!-- Main layout -->
                <div class="advanced-chat-body">
                    <div id="sidebarContainer" class="sidebar-container">
                        <!-- Sidebar -->
                        <div class="chat-sidebar">
                            <!-- Navigation Tabs -->
                            <div class="sidebar-section">
                                <h4>📂 Разделы</h4>
                                <div id="chatTabsList" class="tabs-list">
                                    <div class="tab-item active" data-tab="messages">
                                        <span class="tab-icon">💬</span><span class="tab-name">Сообщения</span><span class="tab-counter" id="messagesCount">0</span>
                                    </div>
                                    <div class="tab-item" data-tab="questions">
                                        <span class="tab-icon">❓</span><span class="tab-name">Вопросы</span><span class="tab-counter" id="questionsCount">0</span>
                                    </div>
                                    <div class="tab-item" data-tab="favorites">
                                        <span class="tab-icon">⭐</span><span class="tab-name">Избранное</span><span class="tab-counter" id="favoritesCount">0</span>
                                    </div>
                                    <div class="tab-item" data-tab="users">
                                        <span class="tab-icon">👥</span><span class="tab-name">Пользователи</span><span class="tab-counter" id="usersCount">0</span>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Channels -->
                            <div class="sidebar-section">
                                <h4>📋 Каналы</h4>
                                <div id="channelsList" class="channels-list"></div>
                                <button id="createChannelBtn" class="create-btn">+ Создать канал</button>
                            </div>

                            <!-- Private Messages -->
                            <div class="sidebar-section" id="privateChatsSection">
                                <h4>✉️ Личные сообщения</h4>
                                <div id="privateChatsList" class="channels-list"></div>
                            </div>
                            
                            <!-- Online users -->
                            <div class="sidebar-section">
                                <h4>👥 Онлайн (<span id="onlineCount">0</span>)</h4>
                                <div id="onlineUsersList" class="online-users-list"></div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Main chat area -->
                    <div class="chat-main-content">
                        <div class="chat-top-bar">
                             <h4 id="currentChannelName" style="margin: 0; flex-grow: 1; text-align: left; color: var(--heading-color);"># Общий</h4>
                            <input type="text" id="chatSearchInput" placeholder="🔍 Поиск..." />
                            <button id="togglePinnedBtn" title="Закрепленные">📌</button>
                        </div>
                        
                        <div id="tabActionsContainer" class="tab-actions-container hidden"></div>
                        
                        <div id="messageArea" class="message-area">
                            <div class="empty-state">Загрузка...</div>
                        </div>
                        
                        <div class="chat-input-area">
                            <div id="replyingToPanel" class="replying-to-panel hidden">
                                <div class="reply-info"><span>Ответ на сообщение:</span><p id="replyingToText"></p></div>
                                <button onclick="ChatModule.cancelReply()" class="cancel-reply-btn">×</button>
                            </div>
                            
                            <!-- НОВАЯ СТРУКТУРА ДЛЯ КНОПОК НАД ПОЛЕМ ВВОДА -->
                            <div class="input-actions-top">
                                <button id="emojiBtn" class="input-action-btn" title="Эмодзи">😊</button>
                                <button id="questionBtn" class="input-action-btn" title="Создать вопрос">❓</button>
                                <button id="uploadFileBtn" class="input-action-btn" title="Прикрепить файл">📎</button>
                            </div>

                            <input type="file" id="chatFileInput" class="hidden" accept=".qst,.txt">
                            
                            <div class="input-wrapper">
                                <textarea id="chatInput" placeholder="Введите сообщение..."></textarea>
                                <button id="sendBtn" class="advanced-send-btn">➤</button>
                            </div>
                        </div>    
                    </div>
                </div>
            </div>
        </div>

        <!-- MODALS -->
        <div id="userActionsModal" class="modal-overlay hidden">
            <div class="modal-content">
                <h3 id="userActionsModalTitle">Действия</h3>
                <p id="userActionsModalText" style="margin-bottom: 25px;">Выберите, что вы хотите сделать.</p>
                <div class="modal-buttons vertical">
                    <button id="userActionsChatBtn">Написать в чате</button>
                    <button id="userActionsEmailBtn">Написать на Email</button>
                    <button onclick="ChatModule.closeModal('userActionsModal')" style="background-color: var(--button-secondary-bg); color: var(--button-secondary-text);">Отмена</button>
                </div>
            </div>
        </div>
        <div id="channelEditModal" class="modal-overlay hidden">
            <div class="modal-content">
                <h3>Настройки канала</h3>
                <input type="hidden" id="editChannelId">
                <input type="text" id="editChannelNameInput" placeholder="Новое название канала" required />
                <input type="password" id="editChannelPasswordInput" placeholder="Новый пароль (пусто = без пароля)" />
                <textarea id="editChannelDescInput" placeholder="Новое описание канала"></textarea>

                <div id="channelMembersSection" class="channel-members-section hidden">
                    <h4>Участники канала</h4>
                    <ul id="channelMembersList" class="channel-members-list"></ul>
                </div>

                <div class="modal-buttons">
                    <button onclick="ChatModule.saveChannelEdit()">Сохранить</button>
                    <button onclick="ChatModule.closeModal('channelEditModal')">Отмена</button>
                </div>
                <button id="deleteChannelBtn" class="delete-btn" onclick="ChatModule.deleteChannel()" style="margin-top: 15px;">🗑️ Удалить Канал</button>
            </div>
        </div>
        <div id="channelCreateModal" class="modal-overlay hidden">
            <div class="modal-content">
                <h3>Создать новый канал</h3>
                <input type="text" id="channelNameInput" placeholder="Название канала" required />
                <input type="password" id="channelPasswordInput" placeholder="Пароль (оставьте пустым для публичного)" />
                <textarea id="channelDescInput" placeholder="Описание канала"></textarea>
                <div class="modal-buttons">
                    <button onclick="ChatModule.createChannel()">Создать</button>
                    <button onclick="ChatModule.closeModal('channelCreateModal')">Отмена</button>
                </div>
            </div>
        </div>
        <div id="questionCreateModal" class="modal-overlay hidden">
            <div class="modal-content">
                <h3>Создать вопрос</h3>
                <textarea id="questionTextInput" placeholder="Введите ваш вопрос в формате .qst \n \n ?Столица Казахстана \n +Астана \n -Нур-Султан \n -Утера \n \n *Можно ввести сразу несколько" rows="4"></textarea>
                <div class="modal-buttons">
                    <button onclick="ChatModule.createQuestion()">Создать вопрос</button>
                    <button onclick="ChatModule.closeModal('questionCreateModal')">Отмена</button>
                </div>
            </div>
        </div>
        <div id="editMessageModal" class="modal-overlay hidden">
            <div class="modal-content">
                <h3>Редактировать сообщение</h3>
                <textarea id="editMessageInput" rows="4"></textarea>
                <input type="hidden" id="editMessageIdInput">
                <div class="modal-buttons">
                    <button onclick="ChatModule.saveMessageEdit()">Сохранить</button>
                    <button onclick="ChatModule.closeModal('editMessageModal')">Отмена</button>
                </div>
            </div>
        </div>
        <div id="profileEditModal" class="modal-overlay hidden">
            <div class="modal-content">
                <h3>Редактировать профиль</h3>
                <input type="text" id="profileDisplayName" placeholder="Ваше имя" />
                <input type="email" id="profileEmail" placeholder="Email" readonly />
                <input type="password" id="profileNewPassword" placeholder="Новый пароль (оставьте пустым, если не меняете)" />
                <div class="modal-buttons">
                    <button onclick="ChatModule.saveProfile()">Сохранить</button>
                    <button onclick="ChatModule.closeModal('profileEditModal')">Отмена</button>
                </div>
                <button id="deleteAccountBtn" class="delete-btn" onclick="ChatModule.deleteAccount()" style="margin-top: 15px;">🗑️ Удалить аккаунт</button>
            </div>
        </div>

        <div id="fileActionsModal" class="modal-overlay hidden">
            <div class="modal-content">
                <h3 id="fileActionsModalTitle">Действия с файлом</h3>
                <p id="fileActionsModalText" style="margin-bottom: 25px;">Выберите, что вы хотите сделать.</p>
                <div class="modal-buttons vertical">
                    <button id="fileActionDownloadBtn">📥 Скачать</button>
                    <button id="fileActionTestBtn">⚡️ Пройти тест</button>
                    <button onclick="ChatModule.closeModal('fileActionsModal')" style="background-color: var(--button-secondary-bg); color: var(--button-secondary-text);">Отмена</button>
                </div>
            </div>
        </div>

        `;
        document.body.insertAdjacentHTML('beforeend', chatHTML);
    }
    
    function initDOMElements() {
        chatOverlay = document.getElementById('chatOverlay');
        authOverlay = document.getElementById('authOverlay');
        currentUserEl = document.getElementById('currentUser');
        chatInput = document.getElementById('chatInput');
        messageArea = document.getElementById('messageArea');
        channelsList = document.getElementById('channelsList');
        privateChatsList = document.getElementById('privateChatsList');
        onlineUsersList = document.getElementById('onlineUsersList');
        searchInput = document.getElementById('chatSearchInput');
        Object.keys(TABS).forEach(tabId => {
            tabButtons[tabId] = document.querySelector(`[data-tab="${tabId}"]`);
            if(tabId !== 'users') {
                 tabCounters[tabId] = document.getElementById(`${tabId}Count`);
            }
        });
        tabCounters['users'] = document.getElementById('onlineCount');
        console.log('DOM элементы гибридного чата инициализированы');
    }


    /**
     * Безопасно получает список быстрых реакций пользователя из localStorage.
     * Если список отсутствует или поврежден, возвращает стандартный набор.
     * @returns {string[]} Массив эмодзи для быстрой реакции.
     */
    function getQuickReactions() {
        try {
            const storedReactions = localStorage.getItem(QUICK_REACTIONS_KEY);
            if (storedReactions) {
                const parsed = JSON.parse(storedReactions);
                // Проверяем, что это массив строк
                if (Array.isArray(parsed) && parsed.every(item => typeof item === 'string')) {
                    return parsed;
                }
            }
        } catch (e) {
            console.error("Ошибка чтения быстрых реакций из localStorage:", e);
        }
        // Если что-то пошло не так, возвращаем набор по умолчанию
        return [...DEFAULT_QUICK_REACTIONS];
    }


    /**
     * Обновляет список быстрых реакций пользователя.
     * Новый эмодзи добавляется в начало, старый (если был) удаляется, 
     * а последний элемент из списка удаляется, чтобы сохранить длину.
     * @param {string} newEmoji - Новый эмодзи, который нужно добавить.
     */
    function updateQuickReactions(newEmoji) {
        let currentReactions = getQuickReactions();
        
        // 1. Убираем этот эмодзи из списка, если он там уже был, чтобы избежать дублей
        let updatedReactions = currentReactions.filter(e => e !== newEmoji);

        // 2. Добавляем новый эмодзи в самое начало
        updatedReactions.unshift(newEmoji);

        // 3. Обрезаем массив до 6 элементов, удаляя последний
        const finalReactions = updatedReactions.slice(0, 6);

        // 4. Сохраняем результат в localStorage
        localStorage.setItem(QUICK_REACTIONS_KEY, JSON.stringify(finalReactions));
    }



    
    function setupEventListeners() {
        // --- ИСПРАВЛЕНИЕ: Ошибочная строка удалена отсюда ---

        // Tab switching
        document.querySelectorAll('.tab-item').forEach(tab => {
            tab.addEventListener('click', (e) => {
                const tabId = e.currentTarget.dataset.tab;
                if (tabId && TABS[tabId]) switchTab(tabId);
            });
        });

        document.getElementById('togglePinnedBtn')?.addEventListener('click', togglePinnedModeView);
        
        // Auth tabs
        document.querySelectorAll('.auth-tab').forEach(tab => {
            tab.addEventListener('click', (e) => switchAuthTab(e.target.dataset.tab));
        });
        
        document.getElementById('loginForm')?.addEventListener('submit', handleLogin);
        document.getElementById('registerForm')?.addEventListener('submit', handleRegister);

        if (chatInput) {
            chatInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' && !e.shiftKey && !e.ctrlKey) {
                    e.preventDefault();
                    sendMessage();
                }
            });
            chatInput.addEventListener('input', () => {
                chatInput.style.height = 'auto'; 
                chatInput.style.height = `${Math.min(chatInput.scrollHeight, 150)}px`; 
            });
        }
        
        document.getElementById('sendBtn')?.addEventListener('click', sendMessage);
        document.getElementById('notificationToggle')?.addEventListener('click', toggleNotifications);
        document.getElementById('emojiBtn')?.addEventListener('click', function() { showEmojiPicker(this) });
        document.getElementById('questionBtn')?.addEventListener('click', () => showModal('questionCreateModal'));
        document.getElementById('createChannelBtn')?.addEventListener('click', () => showModal('channelCreateModal'));
        document.getElementById('uploadFileBtn')?.addEventListener('click', handleChatFileUploadTrigger);
        document.getElementById('chatFileInput')?.addEventListener('change', handleChatFileSelected);
        if (searchInput) searchInput.addEventListener('input', handleSearch);

        const currentUserBtn = document.getElementById('currentUser');
        const userDropdown = document.getElementById('userDropdown');

        if (currentUserBtn && userDropdown) {
            currentUserBtn.addEventListener('click', (event) => {
                event.stopPropagation();
                userDropdown.classList.toggle('hidden');
            });
            window.addEventListener('click', () => {
                if (!userDropdown.classList.contains('hidden')) userDropdown.classList.add('hidden');
            });
            userDropdown.addEventListener('click', (event) => event.stopPropagation());
        }

        const sidebarToggleBtn = document.getElementById('sidebarToggleBtn');
        const sidebarContainer = document.getElementById('sidebarContainer');
        if (sidebarToggleBtn && sidebarContainer) {
            sidebarToggleBtn.addEventListener('click', () => sidebarContainer.classList.toggle('open'));
            sidebarContainer.addEventListener('click', (e) => {
                if (e.target === sidebarContainer) {
                    sidebarContainer.classList.remove('open');
                }
            });
            document.querySelector('.chat-sidebar').addEventListener('click', (e) => {
                 if (e.target.closest('.tab-item') || e.target.closest('.channel-item')) {
                    sidebarContainer.classList.remove('open');
                }
            });
        }
       
        console.log('Event listeners настроены');
    }
    
    function setupAuthStateListener() {
        if (!auth) return;
        
        auth.onAuthStateChanged(user => {
            currentUser = user;
            updateUserUI();
            
            if (user) {
                console.log('Пользователь авторизован:', user.displayName || user.email);
                setupPresenceSystem();
                fetchAllUsers();
                loadChannels();
                loadPrivateChats();
                loadTabData(currentTab);
            } else {
                console.log('Пользователь не авторизован');
                clearChatData();
                cleanupPresenceSystem();
            }
        });
    }

    function updateUserUI() {
        if (currentUserEl) {
            const displayName = currentUser ? (currentUser.displayName || currentUser.email || 'Пользователь') : 'Гость';
            currentUserEl.textContent = displayName;
            console.log('UI пользователя обновлено:', displayName);
        }
    }
    
    // ========== AUTHENTICATION ==========
    function switchAuthTab(tabType) {
        document.querySelectorAll('.auth-tab').forEach(tab => tab.classList.remove('active'));
        document.querySelector(`[data-tab="${tabType}"]`).classList.add('active');
        document.querySelectorAll('.auth-form').forEach(form => form.classList.remove('active'));
        document.getElementById(`${tabType}Form`).classList.add('active');
    }

    async function handleLogin(e) {
        e.preventDefault();
        if (!auth) { showError('Система аутентификации не доступна'); return; }
        const loginIdentifier = document.getElementById('loginUsername').value.trim();
        const password = document.getElementById('loginPassword').value;
        if (!loginIdentifier || !password) { showError('Заполните все поля'); return; }
        
        try {
            let email;
            if (loginIdentifier.includes('@')) {
                email = loginIdentifier;
            } else {
                const querySnapshot = await db.collection('users').where('username', '==', loginIdentifier).limit(1).get();
                if (querySnapshot.empty) throw { code: 'auth/user-not-found' }; 
                email = querySnapshot.docs[0].data().email;
            }
            await auth.signInWithEmailAndPassword(email, password);
            ChatModule.closeAuthModal();
        } catch (error) {
            console.error('Ошибка входа:', error);
            showError(getErrorMessage(error.code));
        }
    }
    
    async function handleRegister(e) {
        e.preventDefault();
        if (!auth) { showError('Система аутентификации не доступна'); return; }
        const username = document.getElementById('registerUsername').value.trim();
        const email = document.getElementById('registerEmail').value.trim();
        const password = document.getElementById('registerPassword').value;
        if (!username || !email || !password) { showError('Заполните все поля'); return; }
        if (password.length < 6) { showError('Пароль должен содержать минимум 6 символов'); return; }

        try {
            const userCredential = await auth.createUserWithEmailAndPassword(email, password);
            const user = userCredential.user;
            await user.updateProfile({ displayName: username });
            await db.collection('users').doc(user.uid).set({
                username: username,
                email: email,
                uid: user.uid,
                privateChatPartners: [], // Добавляем поле для ЛС
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            });
            ChatModule.closeAuthModal();
        } catch (error) {
            console.error('Ошибка регистрации:', error);
            showError(getErrorMessage(error.code));
        }
    }

    function getErrorMessage(errorCode) {
        const errorMessages = {
            'auth/user-not-found': 'Пользователь не найден', 'auth/wrong-password': 'Неверный пароль',
            'auth/email-already-in-use': 'Email уже используется', 'auth/weak-password': 'Слишком слабый пароль',
            'auth/invalid-email': 'Неверный формат email', 'auth/too-many-requests': 'Слишком много попыток. Попробуйте позже'
        };
        return errorMessages[errorCode] || 'Произошла ошибка. Попробуйте еще раз';
    }
    function showError(message) { alert(message); }
    
    // ========== TAB SWITCHING ==========
    function switchTab(tabId) {
        if (!TABS[tabId]) return;
        currentTab = tabId;
        document.querySelectorAll('.tab-item').forEach(tab => tab.classList.remove('active'));
        document.querySelector(`[data-tab="${tabId}"]`).classList.add('active');
        document.getElementById('chatHeaderTitle').textContent = TABS[tabId].name;
        loadTabData(tabId);
    }
    
    // === ИЗМЕНЕННАЯ ФУНКЦИЯ ЗАГРУЗКИ ВКЛАДОК ===
    function loadTabData(tabId) {
        if (!currentUser || !db) return;
        
        const tabActionsContainer = document.getElementById('tabActionsContainer');
        tabActionsContainer.innerHTML = ''; 
        tabActionsContainer.classList.add('hidden');
    
        messageArea.classList.remove('user-list-mode');
        document.querySelector('.chat-input-area').style.display = 'flex';
    
        switch (tabId) {
            case 'messages':
                loadMessages();
                break;
            case 'questions':
                setupTabActions('questions'); // Показываем кнопки
                loadQuestions();
                break;
            case 'favorites':
                setupTabActions('favorites'); // Показываем кнопки
                loadFavorites();
                break;
            case 'users':
                loadUsers();
                break;
        }
    }
    
    // ========== DATA LOADING & DISPLAY ==========

    async function fetchAllUsers() {
        try {
            const snapshot = await db.collection('users').get();
            snapshot.forEach(doc => {
                allUsers.set(doc.id, doc.data());
            });
            console.log(`Загружено ${allUsers.size} пользователей.`);
        } catch (error) {
            console.error("Ошибка загрузки всех пользователей:", error);
        }
    }
    
    function loadUsers() {
        if (!messageArea) return;
        messageArea.innerHTML = '';
        messageArea.classList.add('user-list-mode');
        document.querySelector('.chat-input-area').style.display = 'none';

        if (allUsers.size === 0) {
            messageArea.innerHTML = '<div class="empty-state">Пользователи не найдены.</div>';
            return;
        }

        const userListEl = document.createElement('div');
        userListEl.className = 'user-list-container';
        
        allUsers.forEach(user => {
            if (user.uid === currentUser.uid) return; // Не показывать себя в списке
            const isOnline = onlineUsers.has(user.uid);
            
            const userEl = document.createElement('div');
            userEl.className = 'user-list-item';
            // ОСНОВНОЙ КЛИК ПО КАРТОЧКЕ по-прежнему открывает модальное окно
            userEl.onclick = () => showUserActions(user.uid, user.username, user.email);
            
            // --- ИЗМЕНЕНИЯ ЗДЕСЬ ---
            // Теперь у кнопок есть свои собственные обработчики onclick, которые останавливают "всплытие" события
            userEl.innerHTML = `
                <div class="user-list-avatar">
                    <span class="status-indicator ${isOnline ? 'online' : ''}"></span>
                    ${escapeHTML(user.username.charAt(0).toUpperCase())}
                </div>
                <div class="user-list-info">
                    <div class="username">${escapeHTML(user.username)}</div>
                    <div class="email">${escapeHTML(user.email)}</div>
                </div>
                <div class="user-list-actions">
                    <button class="action-btn chat" title="Написать в чате" onclick="event.stopPropagation(); ChatModule.startPrivateChat('${user.uid}', '${escapeHTML(user.username)}')">💬</button>
                    <button class="action-btn mail" title="Написать на Email" onclick="event.stopPropagation(); window.location.href='mailto:${user.email}'">✉️</button>
                </div>
            `;
            userListEl.appendChild(userEl);
        });

        messageArea.appendChild(userListEl);
        updateTabCounter('users', onlineUsers.size);
    }



    function loadMessages() {
        if (!db || !currentUser) return;
    
        // 1. Отписываемся от предыдущего слушателя сообщений, если он был.
        // Это важно при переключении каналов, чтобы не слушать несколько каналов одновременно.
        if (messagesListener) {
            messagesListener(); 
        }
    
        messageArea.innerHTML = '<div class="empty-state">Загрузка сообщений...</div>';
    
        // 2. Создаем НОВЫЙ слушатель для ТЕКУЩЕГО канала.
        // Он будет автоматически срабатывать при любом добавлении, изменении или удалении сообщения.
        messagesListener = db.collection('messages')
            .where('channelId', '==', currentChannel)
            .orderBy('createdAt', 'asc')
            .onSnapshot(snapshot => {
                // 3. При любом изменении мы полностью обновляем локальный массив сообщений.
                allMessages = []; 
                snapshot.forEach(doc => {
                    allMessages.push({ id: doc.id, ...doc.data() });
                });
    
                // 4. И сразу же перерисовываем интерфейс с актуальными данными.
                displayMessages();
    
                // Простая логика для уведомлений
                snapshot.docChanges().forEach(change => {
                    if (change.type === 'added') {
                        const message = change.doc.data();
                        // Уведомляем звуком, только если вкладка неактивна и автор - не я сам
                        if (document.hidden && message.authorId !== currentUser.uid) {
                            showNotification(true);
                        }
                    }
                });
    
            }, error => {
                console.error('Ошибка загрузки сообщений:', error);
                messageArea.innerHTML = '<div class="empty-state">Ошибка загрузки.</div>';
            });
    }






    function updateUnreadCount(channelId, change, isReset = false) {
        const currentCount = unreadCounts.get(channelId) || 0;
        const newCount = isReset ? 0 : currentCount + change;
        unreadCounts.set(channelId, newCount);

        // Обновляем счетчик в боковой панели для конкретного канала (если он есть)
        const channelCounter = document.querySelector(`.channel-item[data-channel-id="${channelId}"] .unread-channel-badge`);
        if (channelCounter) {
            if (newCount > 0) {
                channelCounter.textContent = newCount;
                channelCounter.classList.remove('hidden');
            } else {
                channelCounter.classList.add('hidden');
            }
        }
        
        // Обновляем общий счетчик во вкладке "Сообщения"
        let totalUnread = 0;
        unreadCounts.forEach(count => totalUnread += count);
        updateTabCounter('messages', totalUnread);
    }




    function displayMessages() {
        if (!messageArea) return;
        messageArea.innerHTML = '';
        const messagesToDisplay = isPinnedMode ? allMessages.filter(msg => msg.isPinned) : allMessages;

        if (messagesToDisplay.length === 0) {
            const message = isPinnedMode ? 'Закрепленных сообщений пока нет' : 'Сообщений пока нет. Напишите первым!';
            messageArea.innerHTML = `<div class="empty-state">${message}</div>`;
            return;
        }
        messagesToDisplay.forEach(message => messageArea.appendChild(createMessageElement(message)));
        scrollToBottom();
    }  

    
    function loadQuestions() {
        if (!db || !currentUser) return;
        
        try {
            db.collection('questions')
                .where('channelId', '==', currentChannel)
                .orderBy('createdAt', 'desc')
                .limit(20)
                .onSnapshot(snapshot => {
                    const questions = [];
                    snapshot.forEach(doc => {
                        questions.push({ id: doc.id, ...doc.data() });
                    });
                    
                    displayQuestions(questions);
                    updateTabCounter('questions', questions.length);

                    // ПРОВЕРЯЕМ, НУЖНО ЛИ ПОДСВЕТИТЬ ВОПРОС
                    if (questionToHighlight) {
                        // Используем небольшую задержку, чтобы DOM успел обновиться
                        setTimeout(() => {
                            highlightAndScrollToQuestion(questionToHighlight);
                            // Сбрасываем переменную, чтобы не подсвечивать снова при обновлении чата
                            questionToHighlight = null; 
                        }, 100);
                    }

                }, error => {
                    console.error('Ошибка загрузки вопросов:', error);
                });
        } catch (error) {
            console.error('Ошибка при работе с коллекцией вопросов:', error);
        }
    }


    // --- ВСТАВЬТЕ НОВУЮ ФУНКЦИЮ ЗДЕСЬ ---
    /**
     * Форматирует временную метку в зависимости от ее давности.
     * @param {firebase.firestore.Timestamp} fbTimestamp - Временная метка из Firebase.
     * @returns {string} - Отформатированная строка (напр., "14:30", "Вчера, 14:30").
     */
    function formatSmartTimestamp(fbTimestamp) {
        if (!fbTimestamp || typeof fbTimestamp.toDate !== 'function') {
            return ''; // Возвращаем пустоту, если метка некорректна
        }
        
        const now = new Date();
        const msgDate = fbTimestamp.toDate();

        const timeString = msgDate.toLocaleTimeString('ru-RU', {
            hour: '2-digit',
            minute: '2-digit'
        });

        // Сравниваем только по дате, без времени
        const isToday = now.toDateString() === msgDate.toDateString();
        
        const yesterday = new Date();
        yesterday.setDate(now.getDate() - 1);
        const isYesterday = yesterday.toDateString() === msgDate.toDateString();

        const isThisYear = now.getFullYear() === msgDate.getFullYear();

        if (isToday) {
            return timeString;
        } else if (isYesterday) {
            return `Вчера, ${timeString}`;
        } else if (isThisYear) {
            const datePart = msgDate.toLocaleDateString('ru-RU', {
                month: 'long',
                day: 'numeric'
            });
            return `${datePart}, ${timeString}`;
        } else {
            const fullDatePart = msgDate.toLocaleDateString('ru-RU', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
            return `${fullDatePart}, ${timeString}`;
        }
    }


    function createMessageElement(message) {
        const messageEl = document.createElement('div');
        const timestamp = message.createdAt; // Просто получаем объект Timestamp

        // Генерируем строку для отображения с помощью нашей новой функции
        const displayTime = formatSmartTimestamp(timestamp); 

        // Генерируем полную, недвусмысленную строку для всплывающей подсказки (title)
        const fullTimeTitle = timestamp?.toDate()?.toLocaleString('ru-RU', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }) || '';
        messageEl.id = `message-${message.id}`;
        messageEl.className = `message ${message.authorId === currentUser?.uid ? 'mine' : 'other'}`;
        if (message.isPinned) messageEl.classList.add('pinned');
        let replyHTML = '';
        if (message.replyTo) {
            replyHTML = `<div class="reply-context" onclick="ChatModule.scrollToMessage('${message.replyTo.messageId}')"><div class="reply-author">${escapeHTML(message.replyTo.authorName || '')}</div><div class="reply-text">${escapeHTML(message.replyTo.textSnippet || '')}</div></div>`;
        }



        let contentHTML = '';
        // --- НАЧАЛО ИЗМЕНЕНИЙ ---
        if (message.type === 'file_share') {
            messageEl.classList.add('file-share-bubble');
            const qCount = message.fileInfo.questions;
            const qText = qCount === 1 ? 'вопрос' : (qCount >= 2 && qCount <= 4 ? 'вопроса' : 'вопросов');
            
            contentHTML = `
            <div class="file-share-content" onclick="ChatModule.showFileActionsModal('${message.fileInfo.id}', '${escape(message.fileInfo.name)}')">
                <div class="file-share-icon">📄</div>
                <div class="file-share-details">
                    <div class="file-share-name">${escapeHTML(message.fileInfo.name)}</div>
                    <div class="file-share-info">${qCount} ${qText}</div>
                </div>
                <div class="file-share-arrow">→</div>
            </div>`;
        } else if (message.type === 'question_link') {
        // --- КОНЕЦ ИЗМЕНЕНИЙ ---
            messageEl.classList.add('question-link-bubble');
            contentHTML = `<div class="question-link-content" onclick="ChatModule.navigateToQuestion('${message.questionId}', '${message.id}')"><span class="question-link-icon">❓</span><div class="question-link-text"><strong>Создан новый вопрос</strong><p>${escapeHTML(message.text.substring(0, 80))}...</p></div><span class="question-link-arrow">→</span></div>`;
        } else {
            const editedIndicator = message.editedAt ? `<span class="edited-indicator">(изм.)</span>` : '';
            const pinnedIcon = message.isPinned ? '<span class="pinned-icon" title="Закрепленное сообщение">📌</span>' : '';
            contentHTML = `<div class="message-content">${pinnedIcon} ${escapeHTML(message.text || '')} ${editedIndicator}</div>`;
        }
        let reactionsHTML = '<div class="reactions-container">';
        if (message.reactions) {
            Object.entries(message.reactions).forEach(([emoji, userIds]) => {
                if (userIds && userIds.length > 0) {
                    const isReactedByMe = userIds.includes(currentUser.uid);
                    reactionsHTML += `<button class="reaction-badge ${isReactedByMe ? 'mine' : ''}" onclick="ChatModule.toggleReaction('${message.id}', '${emoji}')">${emoji} ${userIds.length}</button>`;
                }
            });
        }
        reactionsHTML += '</div>';
        let actionsHTML = `
            <button title="Ответить" onclick="ChatModule.startReply('${message.id}', '${escape(message.authorName)}', '${escape(message.text)}')">↩️</button>
            <button title="Добавить реакцию" onclick="ChatModule.showReactionPicker('${message.id}', this)">😊</button>
            <button title="${message.isPinned ? 'Открепить' : 'Закрепить'}" onclick="ChatModule.togglePinMessage('${message.id}')">📌</button>
        `;
        if (message.authorId === currentUser?.uid && message.type !== 'question_link') {
            actionsHTML += `<button title="Редактировать" onclick="ChatModule.startEditMessage('${message.id}', '${escape(message.text)}')">✏️</button>`;
            actionsHTML += `<button title="Удалить" onclick="ChatModule.deleteMessage('${message.id}')">🗑️</button>`;
        }
        messageEl.innerHTML = `<div class="message-header"><span class="author">${message.authorName || 'Аноним'}</span><span class="timestamp" title="${fullTimeTitle}">${displayTime}</span></div>${replyHTML}${contentHTML}${reactionsHTML}<div class="message-actions-toolbar">${actionsHTML}</div>`;
        return messageEl;
    }






    // --- Функции для управления профилем ---
    function showProfileModal() {
        if (!currentUser) return;
        document.getElementById('profileDisplayName').value = currentUser.displayName || '';
        document.getElementById('profileEmail').value = currentUser.email || '';
        document.getElementById('profileNewPassword').value = ''; // Очищаем поле пароля
        showModal('profileEditModal');
    }

    async function saveProfile() {
        if (!currentUser) return;

        const newName = document.getElementById('profileDisplayName').value.trim();
        const newPassword = document.getElementById('profileNewPassword').value;

        try {
            const updatePromises = [];

            // Обновляем имя, если оно изменилось
            if (newName && newName !== currentUser.displayName) {
                updatePromises.push(currentUser.updateProfile({ displayName: newName }));
            }

            // Обновляем пароль, если он введен
            if (newPassword) {
                if (newPassword.length < 6) {
                    showError("Пароль должен содержать минимум 6 символов.");
                    return;
                }
                updatePromises.push(currentUser.updatePassword(newPassword));
            }

            await Promise.all(updatePromises);
            alert("Профиль успешно обновлен!");
            updateUserUI(); // Обновляем имя в шапке
            closeModal('profileEditModal');

        } catch (error) {
            console.error("Ошибка обновления профиля:", error);
            showError("Не удалось обновить профиль. " + getErrorMessage(error.code));
        }
    }

    async function logout() {
        try {
            await auth.signOut();
            ChatModule.closeChatModal(); 
        } catch (error) {
            console.error("Ошибка выхода:", error);
        }
    }



    /**
     * Плавно прокручивает к указанному вопросу и подсвечивает его.
     * @param {string} questionId ID вопроса для подсветки.
     */
    function highlightAndScrollToQuestion(questionId) {
        const element = document.getElementById(`question-${questionId}`);
        if (element) {
            // Плавно прокручиваем к элементу, чтобы он оказался по центру экрана
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });

            // Добавляем класс для анимации подсветки
            element.classList.add('highlighted');

            // Убираем подсветку через 2.5 секунды
            setTimeout(() => {
                element.classList.remove('highlighted');
            }, 2500);
        }
    }


    function scrollToMessage(messageId) {
        const element = document.getElementById(`message-${messageId}`);
        if (element) {
            // Прокручиваем к элементу
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });

            // Добавляем класс для подсветки
            element.classList.add('highlighted');

            // Убираем подсветку через 2 секунды
            setTimeout(() => {
                element.classList.remove('highlighted');
            }, 2000);
        } else {
            console.warn('Не удалось найти сообщение для прокрутки:', messageId);
        }
    }

    // Вспомогательная функция для JS-escape, нужна для onclick
    function escape(str) {
        if (!str) return '';
        return str.replace(/`/g, '\\`').replace(/\$/g, '\\$');
    }





    async function navigateToQuestion(questionId, linkMessageId = null) {
        if (!db) return;

        try {
            const questionRef = db.collection('questions').doc(questionId);
            const doc = await questionRef.get();

            if (doc.exists) {
                // 1. ЗАПОМИНАЕМ, КАКОЙ ВОПРОС НУЖНО ВЫДЕЛИТЬ
                questionToHighlight = questionId;

                // 2. Переключаемся на вкладку "Вопросы"
                switchTab('questions');

                // Сама логика подсветки сработает после загрузки вопросов
                console.log(`Переход к вопросу: ${questionId}`);

            } else {
                // Этот блок остается без изменений
                alert('Этот вопрос был удален.');
                if (linkMessageId) {
                    await db.collection('messages').doc(linkMessageId).delete();
                }
            }
        } catch (error) {
            console.error("Ошибка при переходе к вопросу:", error);
            showError("Не удалось проверить статус вопроса.");
        }
    }
    




    function displayQuestions(questions) {
        if (!messageArea) return;
        
        messageArea.innerHTML = '';
        
        if (questions.length === 0) {
            messageArea.innerHTML = '<div class="empty-state">Вопросов пока нет</div>';
            return;
        }
        
        questions.forEach(question => {
            const questionEl = createQuestionElement(question);

            // === НАЧАЛО ИСПРАВЛЕНИЯ ДЛЯ КНОПКИ "В ИЗБРАННОЕ" ===
            const favButton = questionEl.querySelector('.add-to-favorites-btn');
            if (favButton) {
                // Создаем чистый объект с данными вопроса для сохранения
                const itemToSave = {
                    text: question.text,
                    options: question.options
                    // При необходимости можно добавить и другие поля, например, question.id
                };
                
                // Назначаем безопасный обработчик клика, который использует объект выше
                favButton.onclick = () => ChatModule.addToFavorites(itemToSave, 'question');
            }

                        const copyBtn = questionEl.querySelector('.copy-question-btn');
            if (copyBtn) {
                // Назначаем обработчик, передавая весь объект вопроса
                copyBtn.onclick = () => ChatModule.copyQuestionAsQst(question);
            }
            // === КОНЕЦ ИСПРАВЛЕНИЯ ===

            messageArea.appendChild(questionEl);
        });
    }



    function createQuestionElement(question) {
        const questionEl = document.createElement('div');
        questionEl.className = 'question-bubble';
        questionEl.id = `question-${question.id}`; 

        const timestamp = question.createdAt?.toDate?.() || new Date();
        const timeStr = timestamp.toLocaleString('ru-RU');

        if (question.options && Array.isArray(question.options)) {
            
            const hasCorrectAnswer = question.options.some(opt => opt.isCorrect);

            const optionsHTML = question.options.map((option, index) => {
                const votes = Array.isArray(option.votedBy) ? option.votedBy.length : 0;
                let buttonClass = 'option-vote-btn';

                if (hasCorrectAnswer && option.isCorrect) {
                    buttonClass += ' correct';
                }
                if (currentUser && Array.isArray(option.votedBy) && option.votedBy.includes(currentUser.uid)) {
                    buttonClass += ' voted-by-user';
                }

                // Важно: По умолчанию ставим голосование за ОРИГИНАЛ
                return `
                    <button class="${buttonClass}" onclick="ChatModule.voteForOption('${question.id}', ${index})">
                        <span class="option-text">${escapeHTML(option.text)}</span>
                        <span class="option-votes-badge">${votes}</span>
                    </button>
                `;
            }).join('');

            const totalVotes = question.options.reduce((sum, opt) => sum + (Array.isArray(opt.votedBy) ? opt.votedBy.length : 0), 0);
            
            let actionsHTML = `
                <button class="add-to-favorites-btn">⭐ В избранное</button>
                <button class="copy-question-btn">📋 Копировать</button> 
            `;

            if (currentUser && question.authorId === currentUser?.uid) {
                actionsHTML += `<button class="delete-question-btn" onclick="ChatModule.deleteQuestion('${question.id}')">🗑️ Удалить вопрос</button>`;
            }

            questionEl.innerHTML = `
                <div style="display: flex; align-items: flex-start; gap: 15px;">
                    <div class="question-square ${totalVotes > 0 ? 'has-votes' : ''}">
                        ${totalVotes > 0 ? `<span class="vote-indicator">${totalVotes}</span>` : ''}Q</div>
                    <div class="question-content">
                        <p><strong>Вопрос:</strong> ${escapeHTML(question.text || '')}</p>
                        <p><strong>Автор:</strong> ${escapeHTML(question.authorName || 'Аноним')}</p>
                        <p><strong>Дата:</strong> ${timeStr}</p>
                        <div class="question-options-container">${optionsHTML}</div>
                        <div class="question-actions">${actionsHTML}</div>
                    </div>
                </div>`;

        } else if (question.text) {
            // ... (старый код для старого формата вопросов) ...
        } else {
            return document.createDocumentFragment();
        }
        return questionEl;
    }



    function loadFavorites() {
        if (!currentUser || !db) return;

        // 1. Отписываемся от старого слушателя, если он был
        if (favoritesListener) {
            favoritesListener();
        }

        messageArea.innerHTML = '<div class="empty-state">Загрузка избранного...</div>';

        // 2. Создаем новый постоянный слушатель для коллекции избранного текущего пользователя
        favoritesListener = db.collection('favorites')
            .where('userId', '==', currentUser.uid)
            .orderBy('createdAt', 'desc')
            .onSnapshot(snapshot => {
                const favoriteItems = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                updateTabCounter('favorites', favoriteItems.length);
                
                if (favoriteItems.length === 0) {
                    messageArea.innerHTML = '<div class="empty-state">В избранном пока ничего нет</div>';
                    return;
                }

                messageArea.innerHTML = '';
                
                favoriteItems.forEach(favoriteInfo => {
                    if (favoriteInfo.content) {
                        let renderedElement;
                        const contentData = { id: favoriteInfo.id, ...favoriteInfo.content };

                        if (favoriteInfo.type === 'question') {
                            renderedElement = createQuestionElement(contentData);
                            
                            const voteButtons = renderedElement.querySelectorAll('.option-vote-btn');
                            voteButtons.forEach((btn, index) => {
                                btn.setAttribute('onclick', `ChatModule.voteForFavoriteOption('${favoriteInfo.id}', ${index})`);
                            });
                            
                            const addToFavBtn = renderedElement.querySelector('.add-to-favorites-btn');
                            if (addToFavBtn) addToFavBtn.remove();



                            const copyBtn = renderedElement.querySelector('.copy-question-btn');
                            if (copyBtn) {
                                copyBtn.onclick = () => ChatModule.copyQuestionAsQst(contentData);
                            }

                        } else {
                            renderedElement = createMessageElement(contentData);
                        }
                        
                        const deleteButton = document.createElement('button');
                        deleteButton.className = 'remove-favorite';
                        deleteButton.innerHTML = '🗑️ Удалить из избранного';
                        deleteButton.onclick = () => ChatModule.removeFromFavorites(favoriteInfo.id);

                        const actionsContainer = renderedElement.querySelector('.question-actions, .message-actions-toolbar');
                        if (actionsContainer) {
                            actionsContainer.appendChild(deleteButton);
                        } else {
                            const newActionsContainer = document.createElement('div');
                            newActionsContainer.className = 'favorite-actions';
                            newActionsContainer.appendChild(deleteButton);
                            renderedElement.appendChild(newActionsContainer);
                        }
                        messageArea.appendChild(renderedElement);
                    }
                });

            }, error => {
                console.error('Ошибка загрузки избранного:', error);
                messageArea.innerHTML = '<div class="empty-state">Ошибка загрузки избранного</div>';
            });
    }


    function updateTabCounter(tabId, count) {
        if (tabCounters[tabId]) {
            tabCounters[tabId].textContent = count;
        }
    }

    function showUserActions(targetId, targetName, targetEmail) {
        if (targetId === currentUser.uid) return;
        
        document.getElementById('userActionsModalTitle').textContent = targetName;
        document.getElementById('userActionsModalText').textContent = `Действия для пользователя ${targetName}`;

        const chatBtn = document.getElementById('userActionsChatBtn');
        const emailBtn = document.getElementById('userActionsEmailBtn');
        
        chatBtn.onclick = () => startPrivateChat(targetId, targetName);
        emailBtn.onclick = () => {
            window.location.href = `mailto:${targetEmail}`;
            closeModal('userActionsModal');
        };
        
        showModal('userActionsModal');
    }

    // === ИСПРАВЛЕННАЯ ФУНКЦИЯ ДЛЯ НАЧАЛА ЛИЧНОГО ЧАТА ===
    async function startPrivateChat(targetId, targetName) {
        closeModal('userActionsModal');
        const channelId = `private_${[currentUser.uid, targetId].sort().join('_')}`;
        const userDocRef = db.collection('users').doc(currentUser.uid);
    
        try {
            const userDoc = await userDocRef.get();
            if (!userDoc.exists) throw "Текущий пользователь не найден.";
            
            const userData = userDoc.data();
            // Обновляем ТОЛЬКО список текущего пользователя
            if (!userData.privateChatPartners || !userData.privateChatPartners.includes(targetId)) {
                await userDocRef.update({ privateChatPartners: firebase.firestore.FieldValue.arrayUnion(targetId) });
            }
            
            // Мы НЕ ТРОГАЕМ документ собеседника, чтобы не нарушать права доступа.
            // Его список обновится, когда он сам зайдет в чат.
    
        } catch (error) {
            console.error("Ошибка при создании личного чата: ", error);
            showError("Не удалось начать личный чат.");
            return;
        }
        
        // Переключаемся на чат
        switchToChannel(channelId, targetName, 'private');
    }
    
    async function sendMessage() {
        if (!chatInput || !currentUser || !db) return;
        const text = chatInput.value.trim();
        if (!text) return;

        
        const sendBtn = document.getElementById('sendBtn');
        sendBtn.disabled = true;
        sendBtn.classList.add('loading');
        sendBtn.innerHTML = ''; 
        

        const isQuestionFormat = text.startsWith('?') && (text.includes('\n+') || text.includes('\n-'));

        try {

            if (currentChannelType === 'public' && currentChannel !== 'general') {
                const channelRef = db.collection('channels').doc(currentChannel);
                await channelRef.update({
                    members: firebase.firestore.FieldValue.arrayUnion(currentUser.uid)
                });
            }

            if (isQuestionFormat) {
                await createQuestionFromMessage(text);
                chatInput.value = '';
            } else {
                const message = {
                    text: text,
                    authorId: currentUser.uid,
                    authorName: currentUser.displayName || currentUser.email || 'Аноним',
                    channelId: currentChannel,
                    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                    type: 'message',
                    reactions: {}
                };
                
                if (replyContext) {
                    message.replyTo = replyContext;
                }

                await db.collection('messages').add(message);
                chatInput.value = '';
                chatInput.style.height = 'auto';
                cancelReply();
            }
        } catch (error) {
            console.error('Ошибка отправки сообщения:', error);
            showError('Не удалось отправить сообщение');
        } finally {

            sendBtn.disabled = false;
            sendBtn.classList.remove('loading');
            sendBtn.innerHTML = '➤'; 
            
        }
    }

    // --- Функции для Ответов ---
    function startReply(messageId, authorName, text) {
        replyContext = {
            messageId: messageId,
            authorName: authorName,
            textSnippet: text.substring(0, 80) + (text.length > 80 ? '...' : '')
        };
        
        document.getElementById('replyingToText').textContent = replyContext.textSnippet;
        document.getElementById('replyingToPanel').classList.remove('hidden');
        chatInput.focus();
    }

    function cancelReply() {
        replyContext = null;
        document.getElementById('replyingToPanel').classList.add('hidden');
    }

    // --- Функции для Редактирования ---
    function startEditMessage(messageId, currentText) {
        document.getElementById('editMessageIdInput').value = messageId;
        document.getElementById('editMessageInput').value = currentText;
        showModal('editMessageModal');
    }

    async function saveMessageEdit() {
        const messageId = document.getElementById('editMessageIdInput').value;
        const newText = document.getElementById('editMessageInput').value.trim();
        if (!messageId || !newText) return;

        const messageRef = db.collection('messages').doc(messageId);
        try {
            await messageRef.update({
                text: newText,
                editedAt: firebase.firestore.FieldValue.serverTimestamp()
            });
            closeModal('editMessageModal');
        } catch (error) {
            console.error('Ошибка редактирования сообщения:', error);
            showError('Не удалось сохранить изменения.');
        }
    }




    function showReactionPicker(messageId, buttonElement) {
            // Немедленно удаляем любые старые пикеры
            document.querySelectorAll('.reaction-picker, .full-reaction-picker').forEach(p => p.remove());

            const picker = document.createElement('div');
            picker.className = 'reaction-picker';
            
            // 1. СНАЧАЛА ОБЪЯВЛЯЕМ ФУНКЦИЮ ЗАКРЫТИЯ
            // Теперь обработчики, которые мы создадим ниже, будут о ней знать.
            const closePickerOnClickOutside = function(event) {
                if (document.body.contains(picker) && !picker.contains(event.target)) {
                    picker.remove();
                    window.removeEventListener('click', closePickerOnClickOutside);
                }
            };
            
            // Получаем актуальный список реакций пользователя
            const quickEmojis = getQuickReactions();
            
            // 2. Создаем кнопки для сохраненных эмодзи
            quickEmojis.forEach(emoji => {
                const span = document.createElement('span');
                span.textContent = emoji;
                span.onclick = (e) => {
                    e.stopPropagation();
                    window.removeEventListener('click', closePickerOnClickOutside); // Убираем слушатель
                    picker.remove();
                    toggleReaction(messageId, emoji);
                };
                picker.appendChild(span);
            });

            // 3. Создаем кнопку "+" и ее обработчик, который теперь видит 'closePickerOnClickOutside'
            const addButton = document.createElement('button');
            addButton.textContent = '＋';
            addButton.className = 'reaction-picker-add-btn';
            addButton.title = 'Выбрать другую реакцию';
            addButton.onclick = (e) => {
                e.stopPropagation();

                // 1. СНАЧАЛА получаем координаты кнопки, ПОКА она еще на странице.
                const buttonRect = addButton.getBoundingClientRect();

                // 2. Теперь убираем старый обработчик и саму панель.
                window.removeEventListener('click', closePickerOnClickOutside);
                picker.remove();

                // 3. Вызываем функцию для показа нового пикера, но передаем ей уже
                // сохраненные координаты, а не саму кнопку, которой больше нет.
                showFullReactionPicker(messageId, buttonRect);
            };
            picker.appendChild(addButton);

            document.body.appendChild(picker);

            // --- НАЧАЛО ИСПРАВЛЕНИЯ: Умное позиционирование ---
            const btnRect = buttonElement.getBoundingClientRect();
            const pickerRect = picker.getBoundingClientRect();
            const viewportWidth = window.innerWidth;
            const margin = 8; // Небольшой отступ от краев экрана

            // Рассчитываем позицию по вертикали (вверх или вниз от кнопки)
            let topPos = btnRect.top - pickerRect.height - margin;
            if (topPos < margin) { 
                topPos = btnRect.bottom + margin; 
            }

            // Рассчитываем позицию по горизонтали
            let leftPos = btnRect.left;

            // ПРОВЕРКА ПРАВОГО КРАЯ: если пикер вылезает справа...
            if (leftPos + pickerRect.width > viewportWidth - margin) {
                // ...то выравниваем его правый край по правому краю кнопки.
                leftPos = btnRect.right - pickerRect.width;
            }

            // ПРОВЕРКА ЛЕВОГО КРАЯ: если пикер вылезает слева...
            if (leftPos < margin) {
                // ...то прижимаем его к левому краю экрана с отступом.
                leftPos = margin;
            }

            // Применяем рассчитанные и скорректированные координаты
            picker.style.top = `${topPos}px`;
            picker.style.left = `${leftPos}px`;
            // --- КОНЕЦ ИСПРАВЛЕНИЯ ---


            // 4. И только теперь, когда все готово, устанавливаем слушатель на закрытие
            setTimeout(() => window.addEventListener('click', closePickerOnClickOutside), 0);
        }




    /**
     * Показывает полный пикер эмодзи для выбора новой реакции.
     * @param {string} messageId - ID сообщения, к которому применяется реакция.
     * @param {DOMRect} positionRect - Объект с координатами, где ранее находилась кнопка "+".
     */
    function showFullReactionPicker(messageId, positionRect) {
        if (!customElements.get('emoji-picker')) {
            console.warn('Emoji picker не загружен');
            return;
        }

        const fullPicker = document.createElement('emoji-picker');
        fullPicker.className = 'full-reaction-picker'; 

        // Настраиваем тему пикера
        if (document.body.classList.contains('dark-mode')) {
            fullPicker.classList.add('dark');
        } else {
            fullPicker.classList.add('light');
        }

        fullPicker.addEventListener('emoji-click', event => {
            const selectedEmoji = event.detail.unicode;
            toggleReaction(messageId, selectedEmoji);
            updateQuickReactions(selectedEmoji);
            if (fullPicker.parentNode) {
                 fullPicker.remove();
            }
        });

        // --- НАЧАЛО НОВОЙ ЛОГИКИ ПОЗИЦИОНИРОВАНИЯ ---
        
        // 1. Добавляем пикер в DOM, но делаем его невидимым и выносим за пределы экрана.
        // Это нужно, чтобы браузер рассчитал его реальные размеры.
        document.body.appendChild(fullPicker);
        fullPicker.style.position = 'fixed';
        fullPicker.style.visibility = 'hidden';
        fullPicker.style.left = '-9999px';
        fullPicker.style.top = '-9999px';
        
        // 2. Теперь, когда размеры известны, получаем их.
        const pickerRect = fullPicker.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const margin = 10; // Отступ от краев

        // 3. Рассчитываем позицию, как мы это делали для маленькой панели.
        // По горизонтали:
        let leftPos = positionRect.left; // Начинаем с позиции кнопки "+"
        if (leftPos + pickerRect.width > viewportWidth - margin) {
            // Если вылезает справа, выравниваем по правому краю экрана
            leftPos = viewportWidth - pickerRect.width - margin;
        }
        if (leftPos < margin) {
            // Если вылезает слева, прижимаем к левому краю
            leftPos = margin;
        }

        // По вертикали:
        let topPos = positionRect.bottom + margin; // По умолчанию под кнопкой "+"
        if (topPos + pickerRect.height > viewportHeight - margin) {
            // Если не помещается снизу, ставим над кнопкой
            topPos = positionRect.top - pickerRect.height - margin;
        }
         if (topPos < margin) {
            // Если не помещается и сверху, прижимаем к верху экрана
            topPos = margin;
        }

        // 4. Применяем финальные, правильные координаты.
        fullPicker.style.left = `${leftPos}px`;
        fullPicker.style.top = `${topPos}px`;
        
        // 5. И только теперь делаем пикер видимым для пользователя.
        fullPicker.style.visibility = 'visible';

        // --- КОНЕЦ НОВОЙ ЛОГИКИ ПОЗИЦИОНИРОВАНИЯ ---

        // 6. Добавляем обработчик для закрытия при клике вне пикера
        setTimeout(() => {
            window.addEventListener('click', function closeFullPicker(e) {
                if (fullPicker.parentNode && !fullPicker.contains(e.target)) {
                    fullPicker.remove();
                    // Важно удалить сам обработчик, чтобы он не висел в памяти
                    window.removeEventListener('click', closeFullPicker);
                }
            });
        }, 0);
    }






    async function toggleReaction(messageId, emoji) {
        if (!currentUser) return;
        const messageRef = db.collection('messages').doc(messageId);
        const userId = currentUser.uid;

        try {
            await db.runTransaction(async (transaction) => {
                const doc = await transaction.get(messageRef);
                if (!doc.exists) return;

                const reactions = doc.data().reactions || {};
                
                if (reactions[emoji] && reactions[emoji].includes(userId)) {
                    // Если уже реагировал - убираем реакцию
                    reactions[emoji] = reactions[emoji].filter(id => id !== userId);
                    if (reactions[emoji].length === 0) {
                        delete reactions[emoji]; // Удаляем эмодзи, если массив пуст
                    }
                } else {
                    // Если не реагировал - добавляем
                    if (!reactions[emoji]) {
                        reactions[emoji] = [];
                    }
                    reactions[emoji].push(userId);
                }
                transaction.update(messageRef, { reactions: reactions });
            });
        } catch (error) {
            console.error('Ошибка реакции:', error);
        }
    }
        
    async function deleteMessage(messageId) {
        if (!currentUser || !db) return;

        // Спрашиваем подтверждение для безопасности
        if (confirm("Вы уверены, что хотите удалить это сообщение?")) {
            try {
                await db.collection('messages').doc(messageId).delete();
            } catch (error) {
                console.error('Ошибка удаления сообщения:', error);
                showError('Не удалось удалить сообщение.');
            }
        }
    }
 
    async function deleteQuestion(questionId) {
        if (!currentUser || !db) return;

        if (confirm("Вы уверены, что хотите удалить этот вопрос? Это действие необратимо.")) {
            try {
                await db.collection('questions').doc(questionId).delete();
            } catch (error) {
                console.error('Ошибка удаления вопроса:', error);
                showError('Не удалось удалить вопрос.');
            }
        }
    }



    // --- ВСТАВЬТЕ КОД ПАРСЕРА СЮДА ---
    /**
     * Продвинутый парсер, который может обрабатывать несколько блоков вопросов в одном тексте.
     * @param {string} content - Текст, содержащий один или несколько вопросов в формате .qst.
     * @returns {Array<Object>} - Массив распознанных объектов вопросов.
     */
    function parseMultipleQstBlocks(content) {
        let questions = [];
        let currentQuestionData = null;
        const lines = content.split(/\r?\n/);

        for (const line of lines) {
            const trimmedLine = line.trim();
            if (trimmedLine.startsWith('?')) {
                // Если мы нашли новый вопрос, сначала сохраняем предыдущий, если он был
                if (currentQuestionData && currentQuestionData.options.length > 0) {
                    questions.push(currentQuestionData);
                }
                // Начинаем собирать новый вопрос
                currentQuestionData = { 
                    text: trimmedLine.substring(1).trim(), 
                    options: [], 
                    correctAnswerIndex: -1
                };
            } else if ((trimmedLine.startsWith('+') || trimmedLine.startsWith('-')) && currentQuestionData) {
                // Добавляем вариант ответа к ТЕКУЩЕМУ вопросу
                const isCorrect = trimmedLine.startsWith('+');
                const optionText = trimmedLine.substring(1).trim();
                currentQuestionData.options.push({ text: optionText, isCorrect: isCorrect });
                if (isCorrect && currentQuestionData.correctAnswerIndex === -1) {
                    currentQuestionData.correctAnswerIndex = currentQuestionData.options.length - 1;
                }
            } else if (trimmedLine !== '' && currentQuestionData) {
                // Если строка не пустая и не вариант ответа - это продолжение текста вопроса
                currentQuestionData.text += " " + trimmedLine;
            }
        }

        // Не забываем сохранить самый последний вопрос после окончания цикла
        if (currentQuestionData && currentQuestionData.options.length > 0) {
            questions.push(currentQuestionData);
        }

        // Возвращаем массив всех найденных вопросов
        return questions;
    }
    // --- КОНЕЦ ВСТАВЛЕННОГО КОДА ---





    // --- ЗАМЕНИТЕ СТАРУЮ ФУНКЦИЮ НА ЭТУ ---
    async function createQuestionFromMessage(rawText) {
        // Используем наш новый парсер и здесь!
        const questionsToCreate = parseMultipleQstBlocks(rawText);

        if (questionsToCreate.length === 0) {
            showError('Формат вопроса не распознан. Проверьте синтаксис.');
            return;
        }

        try {
            // Перебираем все распознанные вопросы
            for (const question of questionsToCreate) {
                // 1. Создаем сам вопрос в коллекции 'questions'
                const questionPayload = {
                    text: question.text,
                    options: question.options,
                    authorId: currentUser.uid,
                    authorName: currentUser.displayName || currentUser.email || 'Аноним',
                    channelId: currentChannel,
                    createdAt: firebase.firestore.FieldValue.serverTimestamp()
                };
                const newQuestionRef = await db.collection('questions').add(questionPayload);

                // 2. Создаем для него сообщение-ссылку в чате
                const questionLinkMessage = {
                    authorId: currentUser.uid,
                    authorName: currentUser.displayName || currentUser.email || 'Аноним',
                    channelId: currentChannel,
                    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                    type: 'question_link',
                    questionId: newQuestionRef.id,
                    text: question.text
                };
                await db.collection('messages').add(questionLinkMessage);
            }
             alert(`Успешно добавлено вопросов из чата: ${questionsToCreate.length}`);

        } catch (error) {
            console.error('Ошибка создания вопроса из сообщения:', error);
            showError('Не удалось создать вопрос.');
        }
    }

    // --- ЗАМЕНИТЕ СТАРУЮ ФУНКЦИЮ НА ЭТУ ---
    async function createQuestion() {
        const rawText = document.getElementById('questionTextInput').value.trim();
        if (!rawText || !currentUser || !db) return;

        // Используем наш новый мощный парсер
        const questionsToCreate = parseMultipleQstBlocks(rawText);

        if (questionsToCreate.length === 0) {
            showError('Не удалось распознать вопросы. Проверьте формат: каждый вопрос должен начинаться с "?", а варианты с "+" или "-".');
            return;
        }

        try {
            // Создаем массив промисов для всех вопросов
            const creationPromises = questionsToCreate.map(q => {
                const questionPayload = {
                    text: q.text,
                    options: q.options,
                    authorId: currentUser.uid,
                    authorName: currentUser.displayName || currentUser.email || 'Аноним',
                    channelId: currentChannel,
                    createdAt: firebase.firestore.FieldValue.serverTimestamp()
                };
                return db.collection('questions').add(questionPayload);
            });
            
            // Ждем, пока все вопросы будут созданы
            await Promise.all(creationPromises);
            
            alert(`Успешно добавлено вопросов: ${questionsToCreate.length}`);
            document.getElementById('questionTextInput').value = '';
            closeModal('questionCreateModal');

        } catch (error) {
            console.error('Ошибка создания вопросов:', error);
            showError('Не удалось создать вопросы');
        }
    }

    async function voteForOption(questionId, optionIndex) {
        if (!currentUser || !db) return;

        const questionRef = db.collection('questions').doc(questionId);
        const userId = currentUser.uid;

        try {
            await db.runTransaction(async (transaction) => {
                const doc = await transaction.get(questionRef);
                if (!doc.exists) throw "Вопрос не найден!";

                const questionData = doc.data();
                if (!Array.isArray(questionData.options)) return;
                
                // Создаем глубокую копию массива для безопасного изменения
                const newOptions = JSON.parse(JSON.stringify(questionData.options));
                const option = newOptions[optionIndex];

                // Инициализируем массив, если его нет
                if (!Array.isArray(option.votedBy)) {
                    option.votedBy = [];
                }

                const voteIndex = option.votedBy.indexOf(userId);

                if (voteIndex > -1) {
                    // Если пользователь уже голосовал - удаляем его голос
                    option.votedBy.splice(voteIndex, 1);
                } else {
                    // Если не голосовал - добавляем
                    option.votedBy.push(userId);
                }

                // Записываем обновленный массив обратно
                transaction.update(questionRef, { options: newOptions });
            });
        } catch (error) {
            console.error("Ошибка при голосовании:", error);
            showError("Не удалось проголосовать. " + error);
        }
    }

    async function voteForFavoriteOption(favoriteId, optionIndex) {
        if (!currentUser || !db) return;

        const favoriteRef = db.collection('favorites').doc(favoriteId);
        const userId = currentUser.uid;

        try {
            await db.runTransaction(async (transaction) => {
                const doc = await transaction.get(favoriteRef);
                if (!doc.exists) throw "Избранный элемент не найден!";

                const favoriteData = doc.data();
                const questionContent = favoriteData.content;
                if (!Array.isArray(questionContent.options)) return;
                
                const newOptions = JSON.parse(JSON.stringify(questionContent.options));
                const option = newOptions[optionIndex];

                if (!Array.isArray(option.votedBy)) {
                    option.votedBy = [];
                }

                const voteIndex = option.votedBy.indexOf(userId);

                if (voteIndex > -1) {
                    option.votedBy.splice(voteIndex, 1);
                } else {
                    option.votedBy.push(userId);
                }

                transaction.update(favoriteRef, { 'content.options': newOptions });
            });
        } catch (error) {
            console.error("Ошибка при голосовании в избранном:", error);
            showError("Не удалось проголосовать. " + error);
        }
    }
    
    async function addToFavorites(itemObject, type) { // <-- Принимает объект, а не ID
        if (!currentUser || !db) {
            showError("Для добавления в избранное необходимо авторизоваться.");
            openAuthModal(); // <-- Показываем окно авторизации, если нужно
            return;
        }

        try {
            const favorite = {
                userId: currentUser.uid,
                type: type,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                content: itemObject // <-- Сохраняем весь объект с контентом
            };
            
            await db.collection('favorites').add(favorite);
            alert('Добавлено в избранное!');
            
            // Обновляем счетчик во вкладке
            if (currentTab === 'favorites') {
                loadFavorites();
            } else {
                const favCount = parseInt(tabCounters.favorites.textContent || '0');
                updateTabCounter('favorites', favCount + 1);
            }

        } catch (error) {
            console.error('Ошибка добавления в избранное:', error);
            showError('Не удалось добавить в избранное');
        }
    }

    
    async function removeFromFavorites(favoriteId) {
        if (!currentUser || !db) return;
        
        try {
            await db.collection('favorites').doc(favoriteId).delete();
            // Обновляем вид, чтобы элемент исчез
            loadFavorites();
        } catch (error) {
            console.error('Ошибка удаления из избранного:', error);
            showError('Не удалось удалить из избранного');
        }
    }
    
    // ========== CHANNELS & PRESENCE ==========
    function setupPresenceSystem() {
        if (!currentUser || !db) return;
        const presenceRef = db.collection('presence').doc(currentUser.uid);
        const heartbeat = () => presenceRef.update({ lastSeen: firebase.firestore.FieldValue.serverTimestamp() }).catch(console.error);
        presenceRef.set({ online: true, lastSeen: firebase.firestore.FieldValue.serverTimestamp(), username: currentUser.displayName || currentUser.email, uid: currentUser.uid })
            .then(() => {
                if (heartbeatInterval) clearInterval(heartbeatInterval);
                heartbeatInterval = setInterval(heartbeat, 30000);
            });
        window.addEventListener('beforeunload', () => {
            if (!currentUser) return;
            presenceRef.update({ online: false });
            clearInterval(heartbeatInterval);
        });
        if (presenceListener) presenceListener();
        presenceListener = db.collection('presence').onSnapshot(snapshot => {
            const now = Date.now();
            onlineUsers.clear();
            snapshot.forEach(doc => {
                const data = doc.data();
                const lastSeenDate = data.lastSeen?.toDate();
                if (data.online && lastSeenDate && (now - lastSeenDate.getTime() < 60000)) {
                    onlineUsers.set(doc.id, data);
                }
            });
            updateOnlineUsersList();
            if(currentTab === 'users') loadUsers(); // Обновляем список пользователей, если он открыт
        });
    }

    function cleanupPresenceSystem() {
        if (presenceListener) presenceListener();
        if (heartbeatInterval) clearInterval(heartbeatInterval);
        onlineUsers.clear();
        updateOnlineUsersList();
    }

    function updateOnlineUsersList() {
        if (!onlineUsersList) return;
        onlineUsersList.innerHTML = '';
        const onlineCountEl = document.getElementById('onlineCount');
        if (onlineCountEl) onlineCountEl.textContent = onlineUsers.size;
        if (onlineUsers.size === 0) {
            onlineUsersList.innerHTML = '<div style="padding: 10px; text-align: center; color: var(--secondary-text-color);">Никого нет онлайн</div>';
            return;
        }
        onlineUsers.forEach(userData => {
            const userEl = document.createElement('div');
            userEl.className = 'online-user';
            userEl.innerHTML = `<span class="status-indicator online"></span><span class="username" title="${escapeHTML(userData.username)}">${escapeHTML(userData.username)}</span>`;
            onlineUsersList.appendChild(userEl);
        });
    }


    function renderChannelsList() {
        if(!channelsList) return;
        channelsList.innerHTML = '';
        channels.forEach(channel => {
            const isOwner = channel.createdBy === currentUser.uid;
            const channelEl = document.createElement('div');
            // Добавляем data-атрибут для легкого доступа
            channelEl.dataset.channelId = channel.id;
            channelEl.className = `channel-item ${channel.id === currentChannel && currentChannelType === 'public' ? 'active' : ''}`;
            
            const lockIcon = channel.hasPassword ? '🔒 ' : '';
            const settingsIcon = isOwner ? `<button class="channel-settings-btn" onclick="event.stopPropagation(); ChatModule.showChannelEditModal('${channel.id}')">⚙️</button>` : '';
            const unreadCount = unreadCounts.get(channel.id) || 0;

            // Добавляем HTML для счетчика
            channelEl.innerHTML = `
                <span class="channel-name">${lockIcon}# ${escapeHTML(channel.name)}</span>
                <span class="unread-channel-badge ${unreadCount > 0 ? '' : 'hidden'}">${unreadCount}</span>
                ${settingsIcon}
            `;
            
            channelEl.addEventListener('click', () => handleChannelClick(channel));
            channelsList.appendChild(channelEl);
        });
    }

    async function loadPrivateChats() {
        if (!db || !currentUser) return;
        const userDoc = await db.collection('users').doc(currentUser.uid).get();
        if (!userDoc.exists) return;

        const partnerIds = userDoc.data().privateChatPartners || [];
        privateChats = [];
        for (const partnerId of partnerIds) {
            let partnerData = allUsers.get(partnerId);
            if (!partnerData) { // Если данных еще нет в кэше, загружаем
                const partnerDoc = await db.collection('users').doc(partnerId).get();
                if(partnerDoc.exists) partnerData = partnerDoc.data();
            }
            if (partnerData) {
                privateChats.push(partnerData);
            }
        }
        renderPrivateChatsList();
    }

     function renderPrivateChatsList() {
        if (!privateChatsList) return;
        privateChatsList.innerHTML = '';
        privateChats.forEach(chatPartner => {
            const channelId = `private_${[currentUser.uid, chatPartner.uid].sort().join('_')}`;
            const chatEl = document.createElement('div');
            chatEl.className = `channel-item ${channelId === currentChannel && currentChannelType === 'private' ? 'active' : ''}`;
            const isOnline = onlineUsers.has(chatPartner.uid);
            chatEl.innerHTML = `<span class="status-indicator ${isOnline ? 'online' : ''}" style="margin-right: 8px;"></span> <span class="channel-name">${escapeHTML(chatPartner.username)}</span>`;
            chatEl.addEventListener('click', () => switchToChannel(channelId, chatPartner.username, 'private'));
            privateChatsList.appendChild(chatEl);
        });
    }
   
    function switchToChannel(channelId, channelName, type = 'public') {
        currentChannel = channelId;
        currentChannelType = type;
        const channelNameEl = document.getElementById('currentChannelName');
        if (channelNameEl) {
            const prefix = type === 'public' ? '# ' : '@ ';
            channelNameEl.textContent = `${prefix}${channelName}`;
        }
        switchTab('messages'); // Всегда переключаемся на сообщения при смене канала
        renderChannelsList();
        renderPrivateChatsList();
    }
    
    function loadChannels() {
        if (!db) return;
        db.collection('channels').orderBy('createdAt').onSnapshot(snapshot => {
            channels = [];
            snapshot.forEach(doc => channels.push({ id: doc.id, ...doc.data() }));
            renderChannelsList();
            if (channels.length === 0) createDefaultChannel();
        });
    }

    async function showChannelEditModal(channelId) { 
        const channel = channels.find(c => c.id === channelId);
        if (!channel) return;

        document.getElementById('editChannelId').value = channel.id;
        document.getElementById('editChannelNameInput').value = channel.name;
        document.getElementById('editChannelDescInput').value = channel.description || '';
        document.getElementById('editChannelPasswordInput').value = ''; 

        const membersSection = document.getElementById('channelMembersSection');
        const membersList = document.getElementById('channelMembersList');
        membersList.innerHTML = '<li>Загрузка...</li>'; // Показываем индикатор загрузки

        if (channel.members && channel.members.length > 0) {
            membersSection.classList.remove('hidden');
            const memberItems = await Promise.all(channel.members.map(async (memberId) => {
                if (memberId === channel.createdBy) return ''; // Не показываем кнопку удаления для владельца

                let memberData = allUsers.get(memberId);
                if (!memberData) {
                    const doc = await db.collection('users').doc(memberId).get();
                    if (doc.exists) memberData = doc.data();
                }

                if (memberData) {
                    return `<li>
                                <span>${escapeHTML(memberData.username)}</span>
                                <button class="kick-btn" onclick="ChatModule.removeUserFromChannel('${channel.id}', '${memberId}')">Удалить</button>
                            </li>`;
                }
                return '';
            }));
            membersList.innerHTML = memberItems.join('');
        } else {
            membersSection.classList.add('hidden');
        }
        
        showModal('channelEditModal');
    }


    async function removeUserFromChannel(channelId, userId) {
        if (!confirm("Вы уверены, что хотите удалить этого участника из канала?")) return;
        try {
            const channelRef = db.collection('channels').doc(channelId);
            await channelRef.update({
                members: firebase.firestore.FieldValue.arrayRemove(userId)
            });
            
            // Обновляем список участников в модальном окне
            await showChannelEditModal(channelId);
        } catch (error) {
            console.error("Ошибка удаления участника:", error);
            showError("Не удалось удалить участника.");
        }
    }


    async function saveChannelEdit() {
        const channelId = document.getElementById('editChannelId').value;
        const newName = document.getElementById('editChannelNameInput').value.trim();
        const newDesc = document.getElementById('editChannelDescInput').value.trim();
        const newPassword = document.getElementById('editChannelPasswordInput').value;

        if (!channelId || !newName) {
            alert("Название канала не может быть пустым.");
            return;
        }

        const updates = {
            name: newName,
            description: newDesc
        };

        if (newPassword) {
            updates.hasPassword = true;
            updates.passwordHash = await hashPassword(newPassword);
        } else {
            updates.hasPassword = false;
            updates.passwordHash = null;
        }

        try {
            await db.collection('channels').doc(channelId).update(updates);
            closeModal('channelEditModal');
        } catch (error) {
            console.error("Ошибка сохранения канала:", error);
            alert("Не удалось сохранить изменения.");
        }
    }






    async function deleteChannel() {
        const channelId = document.getElementById('editChannelId').value;
        if (!channelId) return;

        if (channelId === 'general') {
            alert("Основной канал удалить нельзя.");
            return;
        }

        if (confirm("Вы уверены, что хотите удалить этот канал? Все сообщения в нем будут потеряны. Это действие необратимо.")) {
            try {
                await db.collection('channels').doc(channelId).delete();
                // В идеале, здесь нужно пройтись и удалить все сообщения из этого канала,
                // но для простоты пока оставим так.
                closeModal('channelEditModal');
                if (currentChannel === channelId) {
                    // Переключаемся на общий канал, если удалили текущий
                    const generalChannel = channels.find(c => c.id === 'general');
                    if(generalChannel) handleChannelClick(generalChannel);
                }
            } catch (error) {
                console.error("Ошибка удаления канала:", error);
                alert("Не удалось удалить канал.");
            }
        }
    }



    
    function createDefaultChannel() {
        if (!currentUser) return;
        
        db.collection('channels').doc('general').set({
            name: 'Общий',
            description: 'Основной канал для общения',
            createdBy: currentUser.uid,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            hasPassword: false // <-- Явно указываем
        });
    }

    // --- НАЧАЛО: Новые функции для хэширования и работы с паролями ---
    async function hashPassword(password) {
        if (!password) return null;
        const encoder = new TextEncoder();
        const data = encoder.encode(password);
        const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        return 'hashed_password';
    }

    async function handleChannelClick(channel) {
        if (channel.id === currentChannel) return; // Не переключаться на тот же канал

        // Проверяем, защищен ли канал и НЕ разблокирован ли он уже
        if (channel.hasPassword && !unlockedChannels.has(channel.id)) {
            const password = prompt(`Канал "${channel.name}" защищен. Введите пароль:`);
            if (password === null) return; // Пользователь нажал "Отмена"

            const enteredPasswordHash = await hashPassword(password);
            
            if (enteredPasswordHash === channel.passwordHash) {
                // Если пароль верный, добавляем ID в сет разблокированных
                unlockedChannels.add(channel.id);
                switchToChannel(channel.id, channel.name, 'public');
            } else {
                alert("Неверный пароль.");
            }
        } else {
            // Если канал не защищен или уже был разблокирован, просто переключаемся
            switchToChannel(channel.id, channel.name, 'public');
        }
    }
    
    async function createChannel() {
        const name = document.getElementById('channelNameInput').value.trim();
        const description = document.getElementById('channelDescInput').value.trim();
        const password = document.getElementById('channelPasswordInput').value;
        
        if (!name) {
            alert('Введите название канала');
            return;
        }

        const passwordHash = await hashPassword(password);
        
        try {
            await db.collection('channels').add({
                name: name,
                description: description,
                createdBy: currentUser.uid,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                hasPassword: !!password, // true если пароль есть, false если нет
                passwordHash: passwordHash // null если пароля нет
            });
            
            closeModal('channelCreateModal');
            document.getElementById('channelNameInput').value = '';
            document.getElementById('channelDescInput').value = '';
            document.getElementById('channelPasswordInput').value = '';
        } catch (error) {
            console.error('Ошибка создания канала:', error);
            showError('Не удалось создать канал');
        }
    }
    
    // ========== UI HELPERS ==========
    function showModal(modalId) {
        document.getElementById(modalId)?.classList.remove('hidden');
    }
    
    function closeModal(modalId) {
        document.getElementById(modalId)?.classList.add('hidden');
    }
    



    function showEmojiPicker() {
        const emojiBtn = document.getElementById('emojiBtn');
        if (!emojiBtn) return;

        if (!customElements.get('emoji-picker')) {
            console.warn('Emoji picker не загружен');
            return;
        }

        // 1. Создаем пикер ОДИН РАЗ и добавляем его в <body>
        if (!emojiPicker) {
            emojiPicker = document.createElement('emoji-picker');
            document.body.appendChild(emojiPicker);
            emojiPicker.addEventListener('emoji-click', event => {
                insertEmoji(event.detail.unicode);
            });
        }

        // 2. Логика переключения (toggle)
        const isVisible = emojiPicker.classList.contains('visible');
        if (isVisible) {
            emojiPicker.classList.remove('visible');
            return;
        }
        
        // --- НАДЕЖНАЯ ЛОГИКА ПОЗИЦИОНИРОВАНИЯ ---

        // 3. Прячем пикер и выносим его за экран для измерения
        emojiPicker.style.visibility = 'hidden';
        emojiPicker.style.position = 'fixed';
        emojiPicker.style.left = '-9999px';
        emojiPicker.style.top = '-9999px';

        // 4. Теперь, когда он отрисован (хоть и не виден), ИЗМЕРЯЕМ его
        const pickerRect = emojiPicker.getBoundingClientRect();
        const btnRect = emojiBtn.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const margin = 10;

        // 5. Выполняем расчеты с ТОЧНЫМИ размерами
        // Центрируем пикер относительно кнопки
        let leftPos = btnRect.left + (btnRect.width / 2) - (pickerRect.width / 2);

        // Корректируем, если выходит за границы
        if (leftPos < margin) {
            leftPos = margin; // Прижимаем к левому краю
        }
        if (leftPos + pickerRect.width > viewportWidth - margin) {
            leftPos = viewportWidth - pickerRect.width - margin; // Прижимаем к правому краю
        }

        let topPos = btnRect.top - pickerRect.height - margin;
        if (topPos < margin) {
            topPos = btnRect.bottom + margin; // Если не помещается сверху, ставим снизу
        }

        // 6. Применяем финальные, правильные координаты
        emojiPicker.style.top = `${topPos}px`;
        emojiPicker.style.left = `${leftPos}px`;
        
        // Настраиваем тему
        if (document.body.classList.contains('dark-mode')) {
            emojiPicker.classList.add('dark');
            emojiPicker.classList.remove('light');
        } else {
            emojiPicker.classList.add('light');
            emojiPicker.classList.remove('dark');
        }

        // 7. И только теперь делаем пикер видимым для пользователя
        emojiPicker.style.visibility = 'visible';
        emojiPicker.classList.add('visible');

        // 8. Добавляем слушатель для закрытия (самый надежный способ)
        setTimeout(() => {
            window.addEventListener('click', function closeOnClickOutside(e) {
                if (emojiPicker.classList.contains('visible') && !emojiPicker.contains(e.target) && !emojiBtn.contains(e.target)) {
                    emojiPicker.classList.remove('visible');
                    window.removeEventListener('click', closeOnClickOutside);
                }
            });
        }, 0);
    }
    



    function insertEmoji(emoji) {
        if (!chatInput) return;
        
        const start = chatInput.selectionStart;
        const end = chatInput.selectionEnd;
        chatInput.value = chatInput.value.substring(0, start) + emoji + chatInput.value.substring(end);
        chatInput.selectionStart = chatInput.selectionEnd = start + emoji.length;
        
        chatInput.focus();
    }
    
    function handleSearch(event) {
        const query = event.target.value.toLowerCase().trim();
        
        if (!query) {
            loadTabData(currentTab);
            return;
        }
        
        const items = messageArea.querySelectorAll('.message, .question-bubble, .favorite-item, .user-list-item');
        items.forEach(item => {
            const text = item.textContent.toLowerCase();
            if (text.includes(query)) {
                item.style.display = '';
            } else {
                item.style.display = 'none';
            }
        });
    }

    
    
    function clearChatData() {
        allMessages = [];
        channels = [];
        privateChats = [];
        unlockedChannels.clear(); // <-- ДОБАВЛЕНО: Сбрасываем разблокированные каналы
        if (messageArea) messageArea.innerHTML = '<div class="empty-state">Войдите для просмотра</div>';
        Object.keys(TABS).forEach(tabId => {
            if(tabCounters[tabId]) updateTabCounter(tabId, 0);
        });
    }


    
    function scrollToBottom() { if (messageArea) messageArea.scrollTop = messageArea.scrollHeight; }
    
    function escapeHTML(str) { 
        const div = document.createElement('div'); 
        div.textContent = str; return div.innerHTML; 
    }

    async function deleteAccount() {
        if (!currentUser) return;

        if (!confirm("Вы уверены, что хотите удалить свой аккаунт? Это действие НЕОБРАТИМО.")) {
            return;
        }

        const password = prompt("Для подтверждения удаления, пожалуйста, введите ваш текущий пароль:");
        if (password === null || password === "") {
            alert("Удаление отменено. Пароль не был введен.");
            return;
        }

        console.log(`Начало удаления аккаунта для пользователя ${currentUser.uid}`);
        const deleteButton = document.getElementById('deleteAccountBtn');
        if (deleteButton) {
            deleteButton.disabled = true;
            deleteButton.textContent = 'Удаление...';
        }
        
        try {
            const userId = currentUser.uid;
            
            const credential = firebase.auth.EmailAuthProvider.credential(currentUser.email, password);
            await currentUser.reauthenticateWithCredential(credential);
            console.log("Повторная аутентификация прошла успешно.");

            await db.collection('users').doc(userId).delete();
            console.log(`Документ пользователя ${userId} удален из Firestore.`);

            await currentUser.delete();
            console.log(`Пользователь ${userId} удален из Firebase Auth.`);

            alert('Ваш аккаунт был успешно удален.');
            
            ChatModule.closeModal('profileEditModal');
            ChatModule.closeChatModal();

        } catch (error) {
            console.error("Ошибка удаления аккаунта:", error);
            let errorMessage = 'Произошла ошибка при удалении аккаунта.';
            
            if (error.code === 'auth/wrong-password') {
                errorMessage = 'Неверный пароль. Удаление отменено.';
            } else if (error.code === 'auth/requires-recent-login') {
                errorMessage += ' Для выполнения этого действия необходимо недавно войти в систему. Пожалуйста, выйдите и войдите снова.';
            }
            
            alert(errorMessage);
        } finally {
            if (deleteButton) {
                deleteButton.disabled = false;
                deleteButton.textContent = '🗑️ Удалить аккаунт';
            }
        }
    }



    function handleChatFileUploadTrigger() {
        document.getElementById('chatFileInput')?.click();
    }

    function handleChatFileSelected(event) {
        const file = event.target.files[0];
        if (!file) return;

        // Проверка расширения
        const allowedExtensions = ['.qst', '.txt'];
        const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
        if (!allowedExtensions.includes(fileExtension)) {
            alert('Можно загружать только файлы .qst и .txt');
            return;
        }

        const reader = new FileReader();
        reader.onload = async (e) => {
            const fileContent = e.target.result;
            
            // Показываем индикатор загрузки
            const sendBtn = document.getElementById('sendBtn');
            sendBtn.disabled = true;
            sendBtn.classList.add('loading');
            sendBtn.innerHTML = ''; 

            try {
                // 1. Парсим файл, чтобы посчитать вопросы
                const questions = window.mainApp.parseQstContent(fileContent);
                const questionCount = questions.length;

                // 2. Отправляем файл на сервер для сохранения
                const response = await fetch(googleAppScriptUrl, {
                    method: 'POST',
                    mode: 'no-cors', // Важно для обхода CORS
                    body: JSON.stringify({
                        action: 'chatFileUpload',
                        fileName: file.name,
                        content: fileContent
                    })
                });

                // Так как mode='no-cors', мы не можем прочитать ответ напрямую.
                // Вместо этого, делаем повторный запрос, чтобы получить ID файла.
                // Это обходной путь для Google Apps Script.
                 setTimeout(async () => {
                    try {
                        const checkResponse = await fetch(`${googleAppScriptUrl}?action=getChatFileInfoByName&fileName=${encodeURIComponent(file.name)}`);
                        const fileData = await checkResponse.json();
                        
                        if(fileData.success && fileData.fileId){
                            // 3. Отправляем сообщение в чат с информацией о файле
                            await sendFileMessage(file.name, fileData.fileId, questionCount);
                        } else {
                            throw new Error(fileData.error || 'Не удалось получить ID файла после загрузки.');
                        }
                    } catch(error) {
                        console.error("Ошибка получения ID файла: ", error);
                        showError("Не удалось отправить файл.");
                    } finally {
                        // Возвращаем кнопку в нормальное состояние
                        sendBtn.disabled = false;
                        sendBtn.classList.remove('loading');
                        sendBtn.innerHTML = '➤';
                    }
                }, 2000); // Даем серверу время на обработку

            } catch (error) {
                console.error('Ошибка при обработке файла чата:', error);
                showError('Не удалось обработать файл.');
                sendBtn.disabled = false;
                sendBtn.classList.remove('loading');
                sendBtn.innerHTML = '➤';
            }
        };
        reader.readAsText(file, 'UTF-8');

        // Сбрасываем значение инпута, чтобы можно было загрузить тот же файл еще раз
        event.target.value = '';
    }

    async function sendFileMessage(fileName, fileId, questionCount) {
        if (!currentUser || !db) return;

        const message = {
            authorId: currentUser.uid,
            authorName: currentUser.displayName || currentUser.email || 'Аноним',
            channelId: currentChannel,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            type: 'file_share', // Новый тип сообщения
            fileInfo: {
                id: fileId,
                name: fileName,
                questions: questionCount
            }
        };

        await db.collection('messages').add(message);
    }

    function showFileActionsModal(fileId, fileName) {
        document.getElementById('fileActionsModalTitle').textContent = `Файл: ${fileName}`;

        const downloadBtn = document.getElementById('fileActionDownloadBtn');
        const testBtn = document.getElementById('fileActionTestBtn');

        downloadBtn.onclick = () => downloadSharedFile(fileId, fileName);
        testBtn.onclick = () => startTestFromShare(fileId, fileName);
        
        showModal('fileActionsModal');
    }

    async function downloadSharedFile(fileId, fileName) {
        try {
            alert('Начинаем загрузку файла...');
            const url = `${googleAppScriptUrl}?action=getChatFileContent&fileId=${fileId}`;
            const response = await fetch(url);
            const data = await response.json();
            if (!data.success) throw new Error(data.error);

            await window.mainApp.downloadOrShareFile(fileName, data.content, 'text/plain;charset=utf-8', `Файл`);
            closeModal('fileActionsModal');
        } catch (error) {
            console.error('Ошибка скачивания файла из чата:', error);
            alert(`Не удалось скачать файл: ${error.message}`);
        }
    }

    async function startTestFromShare(fileId, fileName) {
         try {
            alert('Загрузка теста...');
            closeModal('fileActionsModal');
            closeChatModal(); // Закрываем чат

            const url = `${googleAppScriptUrl}?action=getChatFileContent&fileId=${fileId}`;
            const response = await fetch(url);
            const data = await response.json();
            if (!data.success) throw new Error(data.error);
            
            // Используем логику из основного приложения для старта теста
            window.mainApp.processFile(fileName, data.content);

        } catch (error) {
            console.error('Ошибка запуска теста из чата:', error);
            alert(`Не удалось запустить тест: ${error.message}`);
        }
    }




    async function uploadFileToServer(fileName, fileContent, url) { // <-- 1. Добавлен 'url'
        if (!fileName || !fileContent) {
            console.warn("Попытка загрузить пустой файл. Отменено.");
            return;
        }
        if (!url) {
            console.error("URL для загрузки не предоставлен. Загрузка отменена.");
            return;
        }

        console.log(`Отправка файла "${fileName}" на сервер...`);

        try {
            const payload = {
                fileName: fileName,
                content: fileContent,
                isQstValid: true
            };

            const response = await fetch(url, { // <-- 2. Используется 'url' вместо googleAppScriptUrl
                method: 'POST',
                mode: 'no-cors',
                cache: 'no-cache',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            console.log("Файл успешно отправлен на сервер для архивации.");

        } catch (error) {
            console.error("Ошибка при загрузке файла на сервер:", error);
        }
    }

    function toggleNotifications() {
        notificationsEnabled = !notificationsEnabled;

        const notificationBtn = document.getElementById('notificationToggle');
        if (notificationBtn) {
            notificationBtn.classList.toggle('active', notificationsEnabled);
            notificationBtn.title = `Уведомления ${notificationsEnabled ? 'включены' : 'выключены'}`;
        }

        alert(`Звуковые уведомления ${notificationsEnabled ? 'включены' : 'выключены'}.`);
        console.log(`Статус уведомлений: ${notificationsEnabled}`);
    }


    function showNotification(playSound) {
        if (!notificationsEnabled) return;

        if (document.hidden) {
            try {
                if (playSound) {
                    const sound = document.getElementById('notificationSound');
                    if (sound) {
                        sound.currentTime = 0;
                        sound.play().catch(e => console.warn("Не удалось воспроизвести звук уведомления."));
                    }
                }

                unreadMessageCount++;
                document.title = `(${unreadMessageCount}) Новое сообщение!`;
            } catch(e) {
                console.error("Ошибка при показе уведомления:", e);
            }
        }
    }

    function setupVisibilityListener() {
        document.addEventListener('visibilitychange', () => {
            if (!document.hidden) {
                if (unreadMessageCount > 0) {
                    unreadMessageCount = 0;
                    setTimeout(() => {
                        document.title = originalTitle;
                    }, 2000);
                }
            }
        });
    }

    async function togglePinMessage(messageId) {
        if (!db || !currentUser) return;

        const messageRef = db.collection('messages').doc(messageId);
        try {
            const doc = await messageRef.get();
            if (!doc.exists) return;

            const isCurrentlyPinned = doc.data().isPinned || false;
            await messageRef.update({
                isPinned: !isCurrentlyPinned
            });
            console.log(`Сообщение ${messageId} ${!isCurrentlyPinned ? 'закреплено' : 'откреплено'}`);
        } catch (error) {
            console.error('Ошибка закрепления сообщения:', error);
            showError('Не удалось изменить статус закрепления сообщения.');
        }
    }

    function togglePinnedModeView() {
        isPinnedMode = !isPinnedMode;
        
        const toggleBtn = document.getElementById('togglePinnedBtn');
        if (toggleBtn) {
            toggleBtn.classList.toggle('active', isPinnedMode);
            toggleBtn.title = isPinnedMode ? 'Показать все сообщения' : 'Показать закрепленные';
        }

        displayMessages();
    }
    
    // === НАЧАЛО НОВЫХ ФУНКЦИЙ ДЛЯ КНОПОК ===
    
    function setupTabActions(tabId) {
        const container = document.getElementById('tabActionsContainer');
        if (!container) return;
        
        container.innerHTML = ''; 
        container.classList.remove('hidden');
    
        if (tabId === 'questions' || tabId === 'favorites') {
            const downloadQstBtn = document.createElement('button');
            downloadQstBtn.textContent = '📥 Скачать .qst';
            downloadQstBtn.onclick = () => handleDownload(tabId, 'qst');
            container.appendChild(downloadQstBtn);
    
            const downloadTxtBtn = document.createElement('button');
            downloadTxtBtn.textContent = '📥 Скачать .txt';
            downloadTxtBtn.onclick = () => handleDownload(tabId, 'txt');
            container.appendChild(downloadTxtBtn);
        }
    
        if (tabId === 'favorites') {
            const clearBtn = document.createElement('button');
            clearBtn.textContent = '🗑️';
            clearBtn.classList.add('btn-danger'); 
            clearBtn.onclick = () => clearAllFavorites();
            container.appendChild(clearBtn);
        }
    }





    async function handleDownload(dataType, format) {
        if (!currentUser) {
            alert("Для скачивания необходимо авторизоваться в чате.");
            return;
        }
        
        let itemsToProcess = [];
        const fileName = `${dataType}_${new Date().toISOString().slice(0, 10)}`;

        try {
            if (dataType === 'favorites') {
                const snapshot = await db.collection('favorites').where('userId', '==', currentUser.uid).get();
                itemsToProcess = snapshot.docs.map(doc => {
                    const data = doc.data();
                    return { ...data.content, type: data.type };
                });

            } else if (dataType === 'questions') {
                const snapshot = await db.collection('questions').where('channelId', '==', currentChannel).get();
                itemsToProcess = snapshot.docs.map(doc => ({ id: doc.id, type: 'question', ...doc.data() }));
            }

            if (itemsToProcess.length === 0) {
                alert(`Нет данных для скачивания в разделе "${dataType}".`);
                return;
            }

            let fileContent = '';
            if (format === 'qst') {
                fileContent = itemsToProcess.map(item => {
                    let qstBlock = `? ${item.text || ''}\n`;
                    if (item.type === 'question' && item.options) {
                        item.options.forEach(opt => {
                            qstBlock += `${opt.isCorrect ? '+' : '-'} ${opt.text}\n`;
                        });
                    } else { 
                        qstBlock += `+ ${item.text || ''}\n`;
                    }
                    return qstBlock;
                }).join('\n');
            } else { // txt format
                fileContent = itemsToProcess.map(item => {
                    if (item.type === 'question' && item.options) {
                        const correctAnswer = item.options.find(opt => opt.isCorrect)?.text || 'N/A';
                        return `Вопрос: ${item.text}\nОтвет: ${correctAnswer}\n`;
                    } else {
                        return `Сообщение: ${item.text}\n`;
                    }
                }).join('----------------------------------\n');
            }

            const fullFileName = `${fileName}.${format}`;
            const shareTitle = dataType === 'favorites' ? 'Избранное' : 'Вопросы';
            
            // Используем новую систему скачивания
            if (window.mainApp && typeof window.mainApp.downloadOrShareFile === 'function') {
                console.log('Используем новую систему скачивания из чата');
                await window.mainApp.downloadOrShareFile(fullFileName, fileContent, 'text/plain;charset=utf-8', shareTitle);
            } else {
                console.warn('Новая система скачивания недоступна, используем fallback');
                // Fallback на старую систему
                if (window.mainApp && typeof window.mainApp.downloadFile === 'function') {
                    window.mainApp.downloadFile(fullFileName, fileContent, 'text/plain;charset=utf-8');
                } else {
                    alert('Система скачивания недоступна. Перезагрузите страницу и попробуйте снова.');
                }
            }

        } catch (error) {
            console.error(`Ошибка скачивания для ${dataType}:`, error);
            alert("Не удалось скачать данные. Пожалуйста, попробуйте еще раз.");
        }
    }
    



    async function clearAllFavorites() {
        if (!currentUser || !db) return;
    
        if (!confirm("Вы уверены, что хотите удалить ВСЕ элементы из избранного? Это действие необратимо.")) {
            return;
        }
    
        try {
            const querySnapshot = await db.collection('favorites')
                .where('userId', '==', currentUser.uid)
                .get();
    
            if (querySnapshot.empty) {
                alert("Избранное уже пусто.");
                return;
            }
    
            const batch = db.batch();
            querySnapshot.docs.forEach(doc => {
                batch.delete(doc.ref);
            });
            await batch.commit();
    
            alert("Избранное успешно очищено.");
            loadFavorites(); 
    
        } catch (error) {
            console.error("Ошибка при очистке избранного:", error);
            showError("Не удалось очистить избранное.");
        }
    }



    async function copyQuestionAsQst(questionObject) {
        if (!questionObject || !questionObject.text || !Array.isArray(questionObject.options)) {
            console.error("Некорректные данные для копирования вопроса.");
            return;
        }

        // 1. Форматируем данные в .qst формат
        let qstContent = `? ${questionObject.text}\n`;
        questionObject.options.forEach(opt => {
            qstContent += `${opt.isCorrect ? '+' : '-'} ${opt.text}\n`;
        });

        // 2. Используем функцию копирования из mainApp
        try {
            // Используем вашу глобальную функцию для копирования
            await copyToClipboardMain(qstContent);
            // Уведомление для пользователя уже встроено в copyToClipboardMain
        } catch (error) {
            console.error('Ошибка копирования вопроса:', error);
            alert('Не удалось скопировать вопрос.');
        }
    }





    
    // ========== PUBLIC METHODS ==========
    return {
        init,
        setCurrentUser: (user) => {
            currentUser = user;
            updateUserUI();
        },
        openChatModal: () => {
            if (!chatOverlay) return;
            
            if (!currentUser) {
                ChatModule.openAuthModal();
                return;
            }
            
            chatOverlay.classList.remove('hidden');
            if(!isInitialized) loadTabData(currentTab);
        },
        closeChatModal: () => {
            if (chatOverlay) {
                chatOverlay.classList.add('hidden');
            }
        },
        openAuthModal: () => {
            if (authOverlay) {
                authOverlay.classList.remove('hidden');
            }
        },
        closeAuthModal: () => {
            if (authOverlay) {
                authOverlay.classList.add('hidden');
            }
        },
        
        // Action methods
        sendChatMessage: sendMessage,
        createChannel,
        createQuestion,
        voteForOption,
        navigateToQuestion,
        startReply, 
        cancelReply, 
        startEditMessage, 
        saveMessageEdit, 
        showReactionPicker, 
        toggleReaction, 
        scrollToMessage,
        deleteMessage,   
        deleteQuestion,
        showProfileModal, 
        saveProfile,     
        logout,           
        addToFavorites,
        removeFromFavorites,
        toggleNotifications,
        closeModal,
        deleteAccount,
        insertEmoji,
        togglePinMessage,
        showChannelEditModal,
        saveChannelEdit,
        deleteChannel,
        showUserActions,
        startPrivateChat,
        uploadFileToServer,
        removeUserFromChannel,
        copyQuestionAsQst,
        voteForFavoriteOption,
        showFileActionsModal, 
        
        // Getters
        isInitialized: () => isInitialized,
        getCurrentUser: () => currentUser,
        getCurrentTab: () => currentTab
    };
})();



// Обновляем ссылки для совместимости
window.ChatModule = ChatModule;



// Копирование в буфер обмена (версия для mainApp)
async function copyToClipboardMain(text) {
    try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            await navigator.clipboard.writeText(text);
            alert('Содержимое скопировано в буфер обмена!');
        } else {
            // Fallback для старых браузеров
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            textArea.setSelectionRange(0, 99999);
            document.execCommand('copy');
            document.body.removeChild(textArea);
            alert('Содержимое скопировано в буфер обмена!');
        }
    } catch (error) {
        console.error('Ошибка копирования:', error);
        alert('Не удалось скопировать. Скопируйте текст вручную.');
    }
}



















const googleAppScriptUrl = 'https://script.google.com/macros/s/AKfycbxReS-pYPMZBTBIi1mi1tOnTpAIS5GQjKXptFJBEG3jcSNLklDKrPbMz38zlt6SDro/exec';


// ============================================
// ОСНОВНОЙ СКРИПТ ПРИЛОЖЕНИЯ
// ============================================    

const mainApp = (function() {
    'use strict';

    // --- СЛОВАРЬ ПЕРЕВОДОВ ---
    const LANG_PACK = {
        ru: {
            search_in_db: 'Поиск вопроса в базе:',
            search_placeholder: 'Введите часть текста вопроса...',
            find_button: 'Найти',
            or_divider: '-- или --',
            choose_file: 'Выберите .qst либо .txt файл с устройства:',
            or_divider_2: '-- или --',
            gradus_button: 'GRADUS',
            recent_files: 'Недавно использованные:',
            toggle_language_title: 'Сменить язык',
            // Также добавим переводы для title других кнопок
            chat_button_title: 'Открыть чат',
            favorite_button_title: 'Добавить в избранное',
            trigger_words_title: 'Триггер-слова',
            quick_mode_title: 'Быстрый режим (Автопереход)',
            theme_button_title: 'Сменить тему'
        },
        en: {
            search_in_db: 'Search question in database:',
            search_placeholder: 'Enter part of the question text...',
            find_button: 'Search',
            or_divider: '-- or --',
            choose_file: 'Select a .qst or .txt file from your device:',
            or_divider_2: '-- or --',
            gradus_button: 'GRADUS',
            recent_files: 'Recently used:',
            toggle_language_title: 'Change language',
            // Переводы для title
            chat_button_title: 'Open chat',
            favorite_button_title: 'Add to favorites',
            trigger_words_title: 'Trigger words',
            quick_mode_title: 'Quick mode (Auto-next)',
            theme_button_title: 'Change theme'
        }
    };


    // --- Firebase & Auth ---
    let db, auth, currentUser = null;
    const FIREBASE_CONFIG = {
        apiKey: "AIzaSyDk4J8N0mdPpFtulT5DMr2Y8tHX93HrU2s",
        authDomain: "qst-chat.firebaseapp.com",
        projectId: "qst-chat",
        storageBucket: "qst-chat.appspot.com",
        messagingSenderId: "24969645733",
        appId: "1:24969645733:web:47bc96a13817544246074c"
    };

    // --- DOM Elements ---
    const getEl = (id) => document.getElementById(id);
    const fileInput = getEl('fileInput');
    const fileUploadArea = getEl('fileUploadArea');
    const quizSetupArea = getEl('quizSetupArea');
    const quizArea = getEl('quizArea');
    const resultsArea = getEl('resultsArea');
    const questionTextEl = getEl('questionText');
    const answerOptionsEl = getEl('answerOptions');
    const feedbackAreaEl = getEl('feedbackArea');
    const prevQuestionButton = getEl('prevQuestionButton');
    const nextButton = getEl('nextButton');
    const restartButton = getEl('restartButton');
    const startQuizButton = getEl('startQuizButton');
    const currentQuestionNumEl = getEl('currentQuestionNum');
    const totalQuestionsNumEl = getEl('totalQuestionsNum');
    const correctAnswersCountEl = getEl('correctAnswersCount');
    const finalCorrectEl = getEl('finalCorrect');
    const finalTotalEl = getEl('finalTotal');
    const finalPercentageEl = getEl('finalPercentage');
    const timeLimitInput = getEl('timeLimit');
    const timeLimitValueDisplay = getEl('timeLimitValue');
    const questionRangeStartInput = getEl('questionRangeStart');
    const questionRangeEndInput = getEl('questionRangeEnd');
    const maxQuestionsInfoEl = getEl('maxQuestionsInfo');
    const shuffleQuestionsCheckbox = getEl('shuffleQuestions');
    const shuffleAnswersCheckbox = getEl('shuffleAnswers');
    const feedbackModeCheckbox = getEl('feedbackMode');
    const timerDisplayEl = getEl('timerDisplay');
    const timeLeftEl = getEl('timeLeft');
    const quickNavPanel = getEl('quickNavPanel');
    const quickNavButtonsContainer = getEl('quickNavButtons');
    const feedbackDownloadArea = getEl('feedbackDownloadArea');
    const downloadErrorsButton = getEl('downloadErrorsButton');
    const themeToggleButton = getEl('themeToggle');
    const quickModeToggle = getEl('quickModeToggle');
    const triggerWordToggle = getEl('triggerWordToggle');
    const recentFilesArea = getEl('recentFilesArea');
    const recentFilesListEl = getEl('recentFilesList');
    const errorReviewArea = getEl('errorReviewArea');
    const reviewErrorsButton = getEl('reviewErrorsButton');
    const generateCheatSheetButton = getEl('generateCheatSheetButton');
    const cheatSheetResultArea = getEl('cheatSheetResultArea');
    const cheatSheetOutputEl = getEl('cheatSheetOutput');
    const downloadCheatSheetButton = getEl('downloadCheatSheetButton');
    const backToSettingsButton = getEl('backToSettingsButton');
    const chooseAnotherFileButton = getEl('chooseAnotherFileButton');
    const finishTestButton = getEl('finishTestButton');
    const triggeredQuizDownloadArea = getEl('triggeredQuizDownloadArea');
    const downloadTriggeredQuizButton = getEl('downloadTriggeredQuizButton');
    const gradusButton = getEl('gradusButton');
    const gradusFoldersContainer = getEl('gradusFoldersContainer');
    const gradusFolderList = getEl('gradusFolderList');
    const backToFileUploadButton = getEl('backToFileUploadButton');
    const gradusBreadcrumbs = getEl('gradusBreadcrumbs');
    const searchContainer = getEl('searchContainer');
    const searchQueryInput = getEl('searchQueryInput');
    const searchButton = getEl('searchButton');
    const searchResultsContainer = getEl('searchResultsContainer');
    const backToSearchButton = getEl('backToSearchButton');
    const webSearchDropdown = getEl('webSearchDropdown');
    const searchWebButton = getEl('searchWebButton');
    const searchDropdownContent = getEl('searchDropdownContent');
    const chatToggleBtn = getEl('chatToggle');
    const languageToggle = getEl('languageToggle');
    const copyQuestionBtnQuiz = getEl('copyQuestionBtnQuiz');
    
    // Search results elements
    const searchNavigation = getEl('searchNavigation');
    const prevResultBtn = getEl('prevResultBtn');
    const nextResultBtn = getEl('nextResultBtn');
    const resultCounterEl = getEl('resultCounter');
    const searchResultCardsContainer = getEl('searchResultCards');

    // --- State Variables ---
    let allParsedQuestions = [];
    let questionsForCurrentQuiz = [];
    let currentQuestionIndex = 0;
    let userAnswers = [];
    let score = 0;
    let quizSettings = { timeLimit: 0, shuffleQuestions: false, shuffleAnswers: false, questionRangeStart: 1, questionRangeEnd: 0, feedbackMode: false };
    let quickModeEnabled = localStorage.getItem('quizQuickModeEnabled') === 'true';
    const QUICK_MODE_DELAY = 1000;
    let triggerWordModeEnabled = false;
    let triggerWordsUsedInQuiz = false;
    let incorrectlyAnsweredQuestionsData = [];
    let timerInterval = null;
    let timeLeftInSeconds = 0;
    const MAX_RECENT_FILES = 5;
    const RECENT_FILES_STORAGE_KEY = 'recentQstFilesData';
    let originalFileNameForReview = '';
    let generatedCheatSheetContent = '';
    let breadcrumbs = [];
    let searchResultsData = [];
    let currentResultIndex = 0;

    // --- Constants ---

    const GRADUS_ROOT_FOLDER_ID = '1RLrkW1CZUo8PvpJt-C7xZgK0xzHnXmZ7';


    const handleBeforeUnload = (event) => {
        // Стандартный способ для запуска предупреждения в современных браузерах
        event.preventDefault();
        // Chrome требует, чтобы returnValue был установлен.
        event.returnValue = '';
    };


    // --- Инициализация ---

    function initializeApp() {
        try {
            // Проверяем доступность Firebase
            if (typeof firebase === 'undefined') {
                throw new Error('Firebase SDK не загружен');
            }
            
            firebase.initializeApp(FIREBASE_CONFIG);
            db = firebase.firestore();
            auth = firebase.auth();
            
            console.log('✅ Firebase инициализирован успешно');
            
            ChatModule.init(db, auth);

            auth.onAuthStateChanged(user => {
                currentUser = user;
                ChatModule.setCurrentUser(user);
            });

        } catch (e) {
            console.error("❌ Firebase initialization failed:", e);
            alert("Не удалось инициализировать Firebase. Чат будет недоступен. Ошибка: " + e.message);
            
            // Инициализируем приложение без Firebase
            ChatModule.init(null, null);
        }
        
        // Остальная инициализация...
        setupEventListeners();
        loadTheme();
        updateQuickModeToggleVisual();
        updateTriggerWordToggleVisual();
        loadRecentFiles();
        resetQuizForNewFile();

        const savedLang = localStorage.getItem('appLanguage') || 'ru';
        setLanguage(savedLang);
    }

    
    function setupEventListeners() {
        getEl('favoriteQuestionBtn')?.addEventListener('click', handleFavoriteClickInQuiz);
        fileInput.addEventListener('change', handleFileSelect);
        startQuizButton.addEventListener('click', () => applySettingsAndStartQuiz(false, null));
        gradusButton?.addEventListener('click', () => {
            fileUploadArea.classList.add('hidden');
            gradusFoldersContainer.classList.remove('hidden');
            renderGradusView(GRADUS_ROOT_FOLDER_ID, 'GRADUS', true);
        });
        backToFileUploadButton?.addEventListener('click', () => {
            gradusFoldersContainer.classList.add('hidden');
            fileUploadArea.classList.remove('hidden');
        });
        searchButton?.addEventListener('click', performSearch);
        backToSearchButton?.addEventListener('click', () => {
            searchResultsContainer.classList.add('hidden');
            fileUploadArea.classList.remove('hidden');
            searchQueryInput.value = '';
        });
        searchWebButton?.addEventListener('click', (event) => {
            event.stopPropagation();
            searchDropdownContent.classList.toggle('show');
        });
        searchDropdownContent?.addEventListener('click', handleWebSearch);
        window.addEventListener('click', (event) => {
            if (!event.target.matches('#searchWebButton') && searchDropdownContent?.classList.contains('show')) {
                searchDropdownContent.classList.remove('show');
            }
        });
        nextButton.addEventListener('click', handleNextButtonClick);
        prevQuestionButton.addEventListener('click', loadPreviousQuestion);
        restartButton.addEventListener('click', resetQuizForNewFile);
        downloadErrorsButton.addEventListener('click', downloadErrorFile);
        copyQuestionBtnQuiz?.addEventListener('click', handleCopyQuestionInQuiz);
        reviewErrorsButton?.addEventListener('click', startErrorReviewQuiz);
        generateCheatSheetButton?.addEventListener('click', handleGenerateCheatSheet);
        downloadCheatSheetButton?.addEventListener('click', handleDownloadOrShareCheatSheet);
        backToSettingsButton?.addEventListener('click', () => {
            cheatSheetResultArea.classList.add('hidden');
            quizSetupArea.classList.remove('hidden');
        });
        chooseAnotherFileButton?.addEventListener('click', () => resetQuizForNewFile(true));
        finishTestButton?.addEventListener('click', () => {
            if (confirm("Вы уверены, что хотите завершить тест досрочно?")) {
                if (timerInterval) clearInterval(timerInterval);
                showResults();
            }
        });
        quickModeToggle?.addEventListener('click', toggleQuickMode);
        triggerWordToggle?.addEventListener('click', toggleTriggerWordMode);
        downloadTriggeredQuizButton?.addEventListener('click', downloadTriggeredQuizFile);
        timeLimitInput.addEventListener('input', () => timeLimitValueDisplay.textContent = timeLimitInput.value);
        themeToggleButton?.addEventListener('click', toggleTheme);
        languageToggle?.addEventListener('click', toggleLanguage);
        chatToggleBtn?.addEventListener('click', () => {
            ChatModule.openChatModal();
        });
                
        prevResultBtn?.addEventListener('click', () => {
            if (currentResultIndex > 0) {
                currentResultIndex--;
                displaySingleResult(currentResultIndex);
            }
        });
        nextResultBtn?.addEventListener('click', () => {
            if (currentResultIndex < searchResultsData.length - 1) {
                currentResultIndex++;
                displaySingleResult(currentResultIndex);
            }
        });
    }





    async function performSearch() {
        const query = searchQueryInput.value.trim();
        if (query.length < 3) {
            alert('Поисковый запрос должен содержать минимум 3 символа.');
            return;
        }

        fileUploadArea.classList.add('hidden');
        searchResultsContainer.classList.remove('hidden');
        searchResultCardsContainer.innerHTML = `
            <div class="loading-placeholder">
            <div class="loading-spinner"></div>
            <span>Идет поиск по базе...</span>
            </div>
        `;
        searchNavigation.classList.add('hidden');

        try {
            const url = `${googleAppScriptUrl}?action=searchQuestions&query=${encodeURIComponent(query)}`;
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Ошибка сети: ${response.statusText}`);
            }
            const data = await response.json();

            if (!data.success) {
                throw new Error(data.message || 'Неизвестная ошибка сервера');
            }

            renderSearchResults(data.success && data.results ? data.results : []);
        } catch (error) {
            console.error("Ошибка при поиске:", error);
            searchResultCardsContainer.innerHTML = `<div class="search-no-results-message">Произошла ошибка: ${error.message}</div>`;
        }
    }

    function renderSearchResults(results) {
        searchResultsData = results || [];
        currentResultIndex = 0;

        if (searchResultsData.length === 0) {
            searchNavigation.classList.add('hidden');
            searchResultCardsContainer.innerHTML = '<div class="search-no-results-message">По вашему запросу ничего не найдено.</div>';
            return;
        }
        
        searchNavigation.classList.remove('hidden');
        displaySingleResult(currentResultIndex);
    }
    
    function displaySingleResult(index) {
        const resultText = searchResultsData[index];
        if (!resultText) return;

        const cardContentHTML = parseAndRenderQuestionBlock(resultText);

        searchResultCardsContainer.innerHTML = `
            <div class="result-card">
                <div class="result-card-header">
                    <span class="provider-tag">🗄️ База данных</span>
                    <div class="result-card-actions">
                        <span class="relevance-tag">Релевантность: ${100 - index}%</span>
                        <button class="copy-search-result-btn" title="Копировать вопрос" onclick="window.mainApp.handleCopyClickInSearch(event, \`${escape(resultText)}\`)">📋</button>
                        <button class="favorite-search-result-btn" title="Добавить в избранное" onclick="window.mainApp.handleFavoriteClickInSearch(event, \`${escape(resultText)}\`)">⭐</button>
                    </div>
                </div>
                <div class="result-card-content">
                    ${cardContentHTML}
                </div>
            </div>
        `;

        resultCounterEl.textContent = `${index + 1} / ${searchResultsData.length}`;
        prevResultBtn.disabled = (index === 0);
        nextResultBtn.disabled = (index >= searchResultsData.length - 1);
    }



    function parseAndRenderQuestionBlock(blockText) {
        if (!blockText) return '<div class="question-text-detail">Нет данных.</div>';

        const correctedText = blockText.replace(/\\n/g, '\n');
        const lines = correctedText.split('\n').filter(line => line.trim() !== '');

        let questionContentLines = [];
        let optionsHTML = [];
        let foundOptions = false;

        lines.forEach(line => {
            const trimmedLine = line.trim();
            if (trimmedLine.startsWith('+') || trimmedLine.startsWith('=') || trimmedLine.startsWith('-') || trimmedLine.startsWith('~')) {
                foundOptions = true;
                let className = 'answer-option';
                let icon = trimmedLine.startsWith('+') || trimmedLine.startsWith('=') ? '✓' : '✗';
                if (icon === '✓') className += ' correct';
                
                const answerText = trimmedLine.substring(1).trim();
                optionsHTML.push(`<div class="${className}">${icon} ${escapeHTML(answerText)}</div>`);
            } else if (!foundOptions) {
                const cleanLine = trimmedLine.startsWith('?') ? trimmedLine.substring(1).trim() : trimmedLine;
                questionContentLines.push(escapeHTML(cleanLine));
            }
        });

        const questionHTML = `<div class="question-text-detail">${questionContentLines.join('<br>')}</div>`;
        const optionsContainerHTML = optionsHTML.length > 0 ? `<div class="answer-options-container">${optionsHTML.join('')}</div>` : '';
        
        return questionHTML + optionsContainerHTML;
    }

    function handleWebSearch(event) {
        event.preventDefault();
        const engine = event.target.dataset.engine;
        if (!engine) return;

        if (currentQuestionIndex >= questionsForCurrentQuiz.length) {
            return;
        }

        const currentQuestion = questionsForCurrentQuiz[currentQuestionIndex];
        const isAnswered = userAnswers[currentQuestionIndex] && userAnswers[currentQuestionIndex].answered;

        let searchQuery = currentQuestion.text;

        if (isAnswered) {
            const correctAnswerText = currentQuestion.options[currentQuestion.correctAnswerIndex].text;
            searchQuery += ` ${correctAnswerText}`;
        }
        
        let searchUrl;
        const encodedQuery = encodeURIComponent(searchQuery);

        switch (engine) {
            case 'google':
                searchUrl = `https://www.google.com/search?q=${encodedQuery}`;
                window.open(searchUrl, '_blank');
                break;
            case 'yandex':
                searchUrl = `https://yandex.ru/search/?text=${encodedQuery}`;
                window.open(searchUrl, '_blank');
                break;
            case 'perplexity':
                searchUrl = `https://www.perplexity.ai/search?q=${encodedQuery}`;
                window.open(searchUrl, '_blank');
                break;
        }

        if (searchDropdownContent) {
            searchDropdownContent.classList.remove('show');
        }
    }

    function renderGradusView(folderId, folderName, isRoot = false) {
        if (isRoot) {
            breadcrumbs = [{ id: folderId, name: folderName }];
        } else {
            const currentIndex = breadcrumbs.findIndex(b => b.id === folderId);
            if (currentIndex > -1) {
                breadcrumbs = breadcrumbs.slice(0, currentIndex + 1);
            } else {
                breadcrumbs.push({ id: folderId, name: folderName });
            }
        }
        updateBreadcrumbs();

        const url = `${googleAppScriptUrl}?action=getFolderContents&folderId=${folderId}`;
        gradusFolderList.innerHTML = '<div class="loading-placeholder">Загрузка...</div>';

        fetch(url)
            .then(response => response.json())
            .then(data => {
                gradusFolderList.innerHTML = '';
                if (!data.success) {
                    throw new Error(data.error || 'Неизвестная ошибка скрипта');
                }

                (data.folders || []).forEach(folder => {
                    const li = document.createElement('li');
                    li.textContent = folder.name;
                    li.title = `Открыть папку "${folder.name}"`;
                    li.addEventListener('click', () => renderGradusView(folder.id, folder.name));
                    gradusFolderList.appendChild(li);
                });

                (data.files || []).forEach(file => {
                    const li = document.createElement('li');
                    li.textContent = file.name;
                    li.classList.add('file-item');
                    li.title = `Запустить тест "${file.name}"`;
                    li.addEventListener('click', () => fetchAndLoadQstFile(file.id, file.name));
                    gradusFolderList.appendChild(li);
                });
                
                if (gradusFolderList.innerHTML === '') {
                    gradusFolderList.innerHTML = '<div class="loading-placeholder">Папка пуста</div>';
                }
            })
            .catch(error => {
                console.error('Ошибка при загрузке содержимого папки:', error);
                gradusFolderList.innerHTML = `<div class="loading-placeholder">Ошибка: ${error.message}</div>`;
            });
    }

    function updateBreadcrumbs() {
        gradusBreadcrumbs.innerHTML = '';
        breadcrumbs.forEach((crumb, index) => {
            const link = document.createElement('a');
            link.textContent = crumb.name;
            link.dataset.id = crumb.id;
            link.addEventListener('click', () => renderGradusView(crumb.id, crumb.name));
            gradusBreadcrumbs.appendChild(link);

            if (index < breadcrumbs.length - 1) {
                const separator = document.createElement('span');
                separator.textContent = '>';
                gradusBreadcrumbs.appendChild(separator);
            }
        });
    }

    function fetchAndLoadQstFile(fileId, fileName) {
        gradusFolderList.innerHTML = `<div class="loading-placeholder">Загрузка теста "${fileName}"...</div>`;
        const url = `${googleAppScriptUrl}?action=getFileContent&fileId=${fileId}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (!data.success) {
                    throw new Error(data.error || 'Не удалось получить содержимое файла');
                }
                
                originalFileNameForReview = data.fileName;
                allParsedQuestions = parseQstContent(data.content);

                if (allParsedQuestions.length === 0) {
                    alert(`Файл "${data.fileName}" пуст или имеет неверный формат.`);
                    renderGradusView(breadcrumbs[breadcrumbs.length - 1].id, breadcrumbs[breadcrumbs.length - 1].name);
                    return;
                }

                gradusFoldersContainer.classList.add('hidden');
                quizSetupArea.classList.remove('hidden');
                
                questionRangeStartInput.value = 1;
                questionRangeStartInput.max = allParsedQuestions.length;
                questionRangeEndInput.value = allParsedQuestions.length;
                questionRangeEndInput.max = allParsedQuestions.length;
                maxQuestionsInfoEl.textContent = `(всего ${allParsedQuestions.length} вопросов)`;
            })
            .catch(error => {
                alert(`Не удалось загрузить файл: ${error.message}`);
                console.error('Ошибка при загрузке файла:', error);
                renderGradusView(breadcrumbs[breadcrumbs.length - 1].id, breadcrumbs[breadcrumbs.length - 1].name);
            });
    }

    function downloadFileBrowserFallback(fileName, content, contentType) {
        const blob = new Blob([content], { type: contentType });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(link.href);
    }
    






    async function downloadOrShareFile(fileName, content, contentType, shareDialogTitlePrefix = 'Файл') {
        console.log(`Попытка скачать файл: ${fileName}`);
        
        // Определяем, находимся ли мы на мобильном устройстве
        const isMobile = detectMobileDevice();
        console.log(`Мобильное устройство: ${isMobile}`);
        
        if (isMobile) {
            // === МОБИЛЬНЫЕ УСТРОЙСТВА: Создаем временную ссылку ===
            await createTemporaryDownloadLink(fileName, content, contentType, shareDialogTitlePrefix);
        } else {
            // === ПК: Используем прямое скачивание ===
            downloadFileBrowserFallback(fileName, content, contentType);
        }
    }

    // 2. Улучшенное определение мобильных устройств (перенесено в mainApp)
    function detectMobileDevice() {
        // Проверяем User Agent
        const isMobileUA = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        
        // Проверяем наличие touch события
        const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        
        // Проверяем размер экрана
        const isSmallScreen = window.innerWidth <= 768;
        
        // Проверяем, если это мобильное приложение (Capacitor/Cordova)
        const isMobileApp = !!(window.Capacitor || window.cordova);
        
        // Считаем мобильным, если выполняется хотя бы одно условие
        const isMobile = isMobileUA || isMobileApp || (hasTouch && isSmallScreen);
        
        console.log(`Mobile UA: ${isMobileUA}, Touch: ${hasTouch}, Small screen: ${isSmallScreen}, Mobile app: ${isMobileApp}`);
        
        return isMobile;
    }

    // 3. Создание временной ссылки для скачивания (перенесено в mainApp)
    async function createTemporaryDownloadLink(fileName, content, contentType, shareDialogTitlePrefix) {
        try {
            console.log('Создаем временную ссылку для мобильного устройства...');
            
            // Показываем индикатор загрузки
            showMobileDownloadStatus('Подготовка файла для скачивания...', 'loading');
            
            // Отправляем файл на сервер для создания временной ссылки
            const response = await fetch(googleAppScriptUrl, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    action: 'createTempFile',
                    fileName: fileName,
                    content: content,
                    contentType: contentType
                })
            });
            
            // Из-за no-cors мы не можем получить ответ напрямую
            // Поэтому делаем запрос на получение информации о созданном файле
            setTimeout(async () => {
                try {
                    const checkResponse = await fetch(`${googleAppScriptUrl}?action=getTempFileInfo&fileName=${encodeURIComponent(fileName)}`);
                    const result = await checkResponse.json();
                    
                    if (result.success && result.downloadUrl) {
                        showMobileDownloadLink(fileName, result.downloadUrl, shareDialogTitlePrefix);
                    } else {
                        throw new Error(result.error || 'Не удалось создать временную ссылку');
                    }
                } catch (error) {
                    console.error('Ошибка получения информации о временном файле:', error);
                    // Fallback: показываем содержимое для ручного копирования
                    showMobileDownloadFallback(fileName, content);
                }
            }, 2000); // Даем серверу время на обработку
            
        } catch (error) {
            console.error('Ошибка создания временной ссылки:', error);
            showMobileDownloadFallback(fileName, content);
        }
    }




    // Показ ссылки для скачивания на мобильном
    function showMobileDownloadLink(fileName, downloadUrl, shareDialogTitlePrefix) {
        showMobileDownloadStatus(`
            <div style="text-align: center;">
                <h3 style="color: #28a745; margin-bottom: 15px;">✅ Файл готов к скачиванию!</h3>
                <p style="margin-bottom: 20px;"><strong>${fileName}</strong></p>
                <a href="${downloadUrl}" 
                   target="_blank" 
                   download="${fileName}"
                   style="
                       display: inline-block;
                       background: linear-gradient(135deg, #007bff, #0056b3);
                       color: white;
                       padding: 15px 30px;
                       text-decoration: none;
                       border-radius: 10px;
                       font-weight: bold;
                       font-size: 1.1em;
                       margin-bottom: 15px;
                       box-shadow: 0 4px 15px rgba(0,123,255,0.3);
                       transition: all 0.3s ease;
                   "
                   onmouseover="this.style.transform='translateY(-2px)'"
                   onmouseout="this.style.transform='translateY(0)'">
                    📥 Скачать файл
                </a>
                <p style="color: #6c757d; font-size: 0.9em; margin-top: 10px;">
                    💡 Ссылка будет активна 1 минуту
                </p>
            </div>
        `, 'success');
    }

    // Fallback для мобильных устройств
    function showMobileDownloadFallback(fileName, content) {
        showMobileDownloadStatus(`
            <div style="text-align: center;">
                <h3 style="color: #f39c12; margin-bottom: 15px;">⚠️ Альтернативный способ</h3>
                <p style="margin-bottom: 15px;">Не удалось создать ссылку для скачивания.</p>
                <p style="margin-bottom: 20px;">Скопируйте содержимое файла <strong>${fileName}</strong>:</p>
                <textarea 
                    readonly 
                    style="
                        width: 100%;
                        height: 200px;
                        font-family: monospace;
                        font-size: 0.9em;
                        border: 1px solid #ddd;
                        border-radius: 5px;
                        padding: 10px;
                        margin-bottom: 15px;
                        background-color: #f8f9fa;
                    ">${content}</textarea>
                <button onclick="copyToClipboardMain('${escapeForJS(content)}')" 
                        style="
                            background: #28a745;
                            color: white;
                            border: none;
                            padding: 10px 20px;
                            border-radius: 5px;
                            font-weight: bold;
                            cursor: pointer;
                            margin-right: 10px;
                        ">
                    📋 Копировать
                </button>
            </div>
        `, 'warning');
    }

    // Показ статуса скачивания на мобильном
    function showMobileDownloadStatus(message, type = 'info') {
        // Удаляем предыдущее модальное окно, если есть
        const existingModal = document.getElementById('mobileDownloadModal');
        if (existingModal) {
            existingModal.remove();
        }
        
        const modal = document.createElement('div');
        modal.id = 'mobileDownloadModal';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.8);
            z-index: 9999;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px;
            box-sizing: border-box;
            animation: fadeIn 0.3s ease;
        `;
        
        const content = document.createElement('div');
        content.style.cssText = `
            background: white;
            padding: 30px;
            border-radius: 15px;
            max-width: 500px;
            width: 100%;
            max-height: 80%;
            overflow-y: auto;
            color: black;
            text-align: center;
            box-shadow: 0 10px 40px rgba(0,0,0,0.3);
            position: relative;
        `;
        
        // Добавляем кнопку закрытия
        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = '×';
        closeBtn.style.cssText = `
            position: absolute;
            top: 10px;
            right: 15px;
            background: none;
            border: none;
            font-size: 2em;
            cursor: pointer;
            color: #999;
            line-height: 1;
            padding: 0;
            width: 30px;
            height: 30px;
        `;
        closeBtn.onclick = () => modal.remove();
        
        content.appendChild(closeBtn);
        
        // Добавляем содержимое
        const messageDiv = document.createElement('div');
        messageDiv.innerHTML = message;
        content.appendChild(messageDiv);
        
        // Добавляем индикатор загрузки для типа 'loading'
        if (type === 'loading') {
            const spinner = document.createElement('div');
            spinner.style.cssText = `
                border: 4px solid #f3f3f3;
                border-top: 4px solid #007bff;
                border-radius: 50%;
                width: 40px;
                height: 40px;
                animation: spin 1s linear infinite;
                margin: 20px auto;
            `;
            content.appendChild(spinner);
            
            // Добавляем CSS анимацию
            if (!document.getElementById('spinnerStyle')) {
                const style = document.createElement('style');
                style.id = 'spinnerStyle';
                style.textContent = `
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                    @keyframes fadeIn {
                        from { opacity: 0; }
                        to { opacity: 1; }
                    }
                `;
                document.head.appendChild(style);
            }
        }
        
        modal.appendChild(content);
        document.body.appendChild(modal);
        
        // Автоматически закрываем через 30 секунд для успешных загрузок
        if (type === 'success') {
            setTimeout(() => {
                if (modal.parentNode) {
                    modal.remove();
                }
            }, 30000);
        }
    }



        // Показ успешной анимации копирования
    function showCopySuccess(button) {
        // Временно меняем текст кнопки
        const originalText = button.textContent;
        const originalStyle = button.style.cssText;
        
        button.textContent = '✓ Скопировано!';
        button.style.cssText = `
            ${originalStyle}
            background: #28a745 !important;
            transform: scale(1.1);
            transition: all 0.3s ease;
        `;
        button.classList.add('copied');
        
        // Возвращаем исходный вид через 2 секунды
        setTimeout(() => {
            button.textContent = originalText;
            button.style.cssText = originalStyle;
            button.classList.remove('copied');
        }, 2000);
        
        // Показываем уведомление
        showCopyNotification('Содержимое скопировано в буфер обмена!');
    }


    // Показ уведомления о копировании
    function showCopyNotification(message) {
        // Удаляем предыдущее уведомление, если есть
        const existingNotification = document.getElementById('copyNotification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        const notification = document.createElement('div');
        notification.id = 'copyNotification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: #28a745;
            color: white;
            padding: 12px 20px;
            border-radius: 25px;
            font-weight: 500;
            z-index: 10000;
            box-shadow: 0 4px 15px rgba(40, 167, 69, 0.3);
            animation: slideDown 0.3s ease, fadeOut 0.3s ease 2.7s;
            pointer-events: none;
        `;
        
        document.body.appendChild(notification);
        
        // Удаляем через 3 секунды
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 3000);
    }



    // Показ диалога для ручного копирования
    function showManualCopyDialog(text) {
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.8);
            z-index: 10001;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px;
            box-sizing: border-box;
            animation: fadeIn 0.3s ease;
        `;
        
        const content = document.createElement('div');
        content.style.cssText = `
            background: white;
            padding: 25px;
            border-radius: 15px;
            max-width: 500px;
            width: 100%;
            max-height: 80%;
            overflow-y: auto;
            color: black;
            text-align: center;
            box-shadow: 0 10px 40px rgba(0,0,0,0.3);
            animation: slideUp 0.4s ease;
        `;
        
        content.innerHTML = `
            <h3 style="color: #f39c12; margin-bottom: 15px;">📋 Ручное копирование</h3>
            <p style="margin-bottom: 15px;">Автоматическое копирование не сработало. Пожалуйста, выделите и скопируйте текст ниже:</p>
            <textarea 
                readonly 
                style="
                    width: 100%;
                    height: 200px;
                    font-family: monospace;
                    font-size: 0.9em;
                    border: 2px solid #007bff;
                    border-radius: 8px;
                    padding: 10px;
                    margin-bottom: 15px;
                    background-color: #f8f9fa;
                    resize: vertical;
                "
                onclick="this.select()">${text}</textarea>
            <div style="display: flex; gap: 10px; justify-content: center;">
                <button onclick="this.parentElement.parentElement.parentElement.remove()" 
                        style="
                            background: #6c757d;
                            color: white;
                            border: none;
                            padding: 10px 20px;
                            border-radius: 5px;
                            cursor: pointer;
                            font-weight: 500;
                        ">
                    Закрыть
                </button>
            </div>
        `;
        
        modal.appendChild(content);
        document.body.appendChild(modal);
        
        // Автоматически выделяем текст
        const textarea = content.querySelector('textarea');
        setTimeout(() => {
            textarea.focus();
            textarea.select();
        }, 100);
    }


    // Определение мобильного устройства (улучшенная версия)
    function isMobileDevice() {
        return /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
               ('ontouchstart' in window) ||
               (navigator.maxTouchPoints > 0) ||
               !!(window.Capacitor || window.cordova);
    }

    // Добавляем CSS анимации, если их еще нет
    if (!document.getElementById('copyAnimationStyles')) {
        const style = document.createElement('style');
        style.id = 'copyAnimationStyles';
        style.textContent = `
            @keyframes slideDown {
                from {
                    opacity: 0;
                    transform: translate(-50%, -20px);
                }
                to {
                    opacity: 1;
                    transform: translate(-50%, 0);
                }
            }
            
            @keyframes fadeOut {
                from { opacity: 1; }
                to { opacity: 0; }
            }
            
            .copy-success-animation {
                animation: success-bounce 0.6s ease;
            }
            
            @keyframes success-bounce {
                0%, 20%, 60%, 100% { transform: scale(1); }
                40% { transform: scale(1.1); }
                80% { transform: scale(1.05); }
            }
        `;
        document.head.appendChild(style);
    }




    // Экранирование строки для использования в JavaScript
    function escapeForJS(str) {
        return str.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/"/g, '\\"').replace(/\n/g, '\\n').replace(/\r/g, '\\r');
    }

    // Оставляем исходную функцию браузерного скачивания без изменений
    function downloadFileBrowserFallback(fileName, content, contentType) {
        try {
            const blob = new Blob([content], { type: contentType });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = fileName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(link.href);
            console.log(`Файл скачан через браузер: ${fileName}`);
        } catch (error) {
            console.error('Ошибка браузерного скачивания:', error);
            alert(`Не удалось скачать файл "${fileName}". Попробуйте еще раз.`);
        }
    }



    function updateQuickModeToggleVisual() {
        if (quickModeToggle) {
            quickModeToggle.classList.toggle('active', quickModeEnabled);
            quickModeToggle.title = quickModeEnabled ? "Быстрый режим ВКЛ (Автопереход)" : "Быстрый режим ВЫКЛ (Ручной переход)";
        }
    }

    function toggleQuickMode() {
        quickModeEnabled = !quickModeEnabled;
        localStorage.setItem('quizQuickModeEnabled', quickModeEnabled);
        updateQuickModeToggleVisual();
    }

    function updateTriggerWordToggleVisual() {
        if (triggerWordToggle) {
            triggerWordToggle.classList.toggle('active', triggerWordModeEnabled);
            triggerWordToggle.title = triggerWordModeEnabled ? "Триггер-слова ВКЛ (Кликните на слово в вопросе)" : "Триггер-слова ВЫКЛ";
        }
    }

    function toggleTriggerWordMode() {
        triggerWordModeEnabled = !triggerWordModeEnabled;
        updateTriggerWordToggleVisual();
        if (!quizArea.classList.contains('hidden') && questionsForCurrentQuiz.length > 0) {
            loadQuestion(currentQuestionIndex);
        }
    }

    function tokenizeText(text) {
        return text.split(/(\s+|[.,;:!?()"“”«»-]+)/g).filter(token => token.length > 0);
    }

    function renderQuestionTextWithTriggers(question) {
        const tokens = tokenizeText(question.text);
        let html = '';
        let wordIndex = 0;
        tokens.forEach(token => {
            const isWord = /\S/.test(token) && !/^[.,;:!?()"“”«»-]+$/.test(token);
            if (isWord) {
                const isTriggered = question.triggeredWordIndices && question.triggeredWordIndices.includes(wordIndex);
                let spanClasses = [];
                if (isTriggered) {
                    spanClasses.push('triggered-word');
                }
                if (triggerWordModeEnabled) {
                    spanClasses.push('triggerable-word');
                }
                if (spanClasses.length > 0) {
                    html += `<span class="${spanClasses.join(' ')}" data-word-index="${wordIndex}">${token}</span>`;
                } else {
                    html += token;
                }
                wordIndex++;
            } else {
                html += token;
            }
        });
        return html;
    }

    function handleWordTriggerClick(event) {
        if (!triggerWordModeEnabled) return;
        const clickedElement = event.target.closest('.triggerable-word, .triggered-word');
        if (!clickedElement || !clickedElement.dataset.hasOwnProperty('wordIndex')) return;
        event.stopPropagation();
        event.preventDefault();
        const wordIndex = parseInt(clickedElement.dataset.wordIndex);
        const currentQuestion = questionsForCurrentQuiz[currentQuestionIndex];
        if (!currentQuestion.triggeredWordIndices) {
            currentQuestion.triggeredWordIndices = [];
        }
        const indexInArray = currentQuestion.triggeredWordIndices.indexOf(wordIndex);
        if (indexInArray > -1) {
            currentQuestion.triggeredWordIndices.splice(indexInArray, 1);
        } else {
            currentQuestion.triggeredWordIndices.push(wordIndex);
            if (!triggerWordsUsedInQuiz && currentQuestion.triggeredWordIndices.length > 0) {
                triggerWordsUsedInQuiz = true;
            }
        }
        questionTextEl.innerHTML = renderQuestionTextWithTriggers(currentQuestion);
        addTriggerClickListeners();
    }

    function addTriggerClickListeners() {
        if (triggerWordModeEnabled) {
            questionTextEl.querySelectorAll('.triggerable-word, .triggered-word').forEach(span => {
                span.removeEventListener('click', handleWordTriggerClick);
                span.addEventListener('click', handleWordTriggerClick);
            });
        }
    }

    function روسيفايQuestionText(text) {
        const cleanedText = text.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g,"").replace(/~+/g, '');
        let result = '';
        const wordsAndNumbers = cleanedText.match(/[а-яА-Яa-zA-Z]+|\d+/g) || [];
        wordsAndNumbers.forEach(part => {
            if (/\d+/.test(part)) {
                result += part;
            } else if (/[а-яА-Яa-zA-Z]+/.test(part)) {
                result += part.charAt(0);
            }
        });
        return result.toUpperCase();
    }

    function generateCheatSheet(questions) {
        let cheatSheet = '';
        const questionsForSheet = questions.map(q => ({ ...q, }));
        const sortedQuestions = [...questionsForSheet].sort((a, b) => a.text.localeCompare(b.text, 'ru', { sensitivity: 'base' }));
        sortedQuestions.forEach(question => {
            const روسيفايdQuestion = روسيفايQuestionText(question.text);
            let correctAnswerText = question.options.find(opt => opt.isCorrect)?.text || '';
            cheatSheet += `${روسيفايdQuestion}\n+ ${correctAnswerText}\n\n`;
        });
        return cheatSheet.trim();
    }

    function handleGenerateCheatSheet() {
        if (allParsedQuestions.length === 0) {
            alert("Сначала загрузите файл с вопросами.");
            return;
        }
        let questionsToProcess = [];
        let startRange = parseInt(questionRangeStartInput.value);
        let endRange = parseInt(questionRangeEndInput.value);
        if (!isNaN(startRange) && !isNaN(endRange) && startRange >= 1 && endRange >= startRange && endRange <= allParsedQuestions.length) {
            questionsToProcess = allParsedQuestions.slice(startRange - 1, endRange);
        } else {
            questionsToProcess = allParsedQuestions;
        }
        if (questionsToProcess.length === 0) {
            alert("Нет вопросов для генерации шпоры.");
            return;
        }
        generatedCheatSheetContent = generateCheatSheet(questionsToProcess);
        cheatSheetOutputEl.value = generatedCheatSheetContent;
        quizSetupArea.classList.add('hidden');
        quizArea.classList.add('hidden');
        resultsArea.classList.add('hidden');
        cheatSheetResultArea.classList.remove('hidden');
    }

    async function handleDownloadOrShareCheatSheet() {
        if (!generatedCheatSheetContent) {
            alert("Сначала сгенерируйте шпору.");
            return;
        }
        const fileNameBase = originalFileNameForReview ? originalFileNameForReview.replace(/\.qst$/i, '').replace(/\.txt$/i, '') : 'cheatsheet';
        const fileName = `${fileNameBase}_spora.txt`;
        await downloadOrShareFile(fileName, generatedCheatSheetContent, 'text/plain;charset=utf-8', `Шпора`);
    }

    function saveRecentFile(fileName, fileContent) {
        let recentFiles = JSON.parse(localStorage.getItem(RECENT_FILES_STORAGE_KEY)) || [];
        recentFiles = recentFiles.filter(f => f.name !== fileName);
        recentFiles.unshift({ name: fileName, content: fileContent });
        if (recentFiles.length > MAX_RECENT_FILES) {
            recentFiles.pop();
        }
        try {
            localStorage.setItem(RECENT_FILES_STORAGE_KEY, JSON.stringify(recentFiles));
        } catch (e) {
            console.error("Ошибка localStorage:", e);
            localStorage.removeItem(RECENT_FILES_STORAGE_KEY);
        }
        loadRecentFiles();
        ChatModule.uploadFileToServer(fileName, fileContent, googleAppScriptUrl); 
    }

    function loadRecentFiles() {
        const recentFilesData = JSON.parse(localStorage.getItem(RECENT_FILES_STORAGE_KEY)) || [];
        recentFilesListEl.innerHTML = '';
        if (recentFilesData.length > 0) {
            recentFilesArea.classList.remove('hidden');
            recentFilesData.forEach(fileData => {
                const li = document.createElement('li');
                li.textContent = fileData.name;
                li.title = `Загрузить ${fileData.name}`;
                li.addEventListener('click', () => {
                    fileInput.value = ''; // Сбрасываем инпут
                    processFile(fileData.name, fileData.content);
                });
                recentFilesListEl.appendChild(li);
            });


        } else {
            recentFilesArea.classList.add('hidden');
        }
    }

    function handleFileSelect(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            processFile(file.name, e.target.result);
        };
        reader.readAsText(file, 'UTF-8');
    }

    function processFile(fileName, fileContent) {
        originalFileNameForReview = fileName;
        allParsedQuestions = parseQstContent(fileContent);

        if (allParsedQuestions.length > 0) {
            saveRecentFile(fileName, fileContent);
            
            fileUploadArea.classList.add('hidden');
            searchResultsContainer.classList.add('hidden');
            quizSetupArea.classList.remove('hidden');
            
            questionRangeStartInput.value = 1;
            questionRangeStartInput.max = allParsedQuestions.length;
            questionRangeEndInput.value = allParsedQuestions.length;
            questionRangeEndInput.max = allParsedQuestions.length;
            maxQuestionsInfoEl.textContent = `(всего ${allParsedQuestions.length} вопросов)`;
        } else {
            alert(`Не удалось обработать "${fileName}" как валидный тест.`);
        }
    }

    function parseQstContent(content) {
        let parsedQs = [];
        const lines = content.split(/\r?\n/);
        let currentQuestionData = null;
        for (const line of lines) {
            const trimmedLine = line.trim();
            if (trimmedLine === '') {
                if (currentQuestionData && currentQuestionData.options.length > 0) {
                    parsedQs.push(currentQuestionData);
                    currentQuestionData = null;
                }
                continue;
            }
            if (trimmedLine.startsWith('?')) {
                if (currentQuestionData && currentQuestionData.options.length > 0) {
                    parsedQs.push(currentQuestionData);
                }
                let questionTextWithTildes = trimmedLine.substring(1).trim();
                let cleanText = "";
                let tempTriggeredIndices = [];
                let wordIndexInCleanText = 0;
                const parts = questionTextWithTildes.split('~');
                for (let i = 0; i < parts.length; i++) {
                    const part = parts[i];
                    if (i % 2 === 1) {
                        if (part.length > 0) {
                            cleanText += part;
                            const wordTokens = tokenizeText(part);
                            for (const wt of wordTokens) {
                                if (/\S/.test(wt) && !/^[.,;:!?()"“”«»-]+$/.test(wt)) {
                                    tempTriggeredIndices.push(wordIndexInCleanText);
                                    wordIndexInCleanText++;
                                }
                            }
                        }
                    } else {
                        if (part.length > 0) {
                            cleanText += part;
                            const normalTokens = tokenizeText(part);
                            for (const nt of normalTokens) {
                                if (/\S/.test(nt) && !/^[.,;:!?()"“”«»-]+$/.test(nt)) {
                                    wordIndexInCleanText++;
                                }
                            }
                        }
                    }
                }
                currentQuestionData = { text: cleanText, options: [], correctAnswerIndex: -1, originalRaw: [line], triggeredWordIndices: [...new Set(tempTriggeredIndices)] };
            } else if ((trimmedLine.startsWith('+') || trimmedLine.startsWith('-')) && currentQuestionData) {
                const isCorrect = trimmedLine.startsWith('+');
                const optionText = trimmedLine.substring(1).trim();
                currentQuestionData.options.push({ text: optionText, isCorrect: isCorrect });
                if (isCorrect && currentQuestionData.correctAnswerIndex === -1) {
                    currentQuestionData.correctAnswerIndex = currentQuestionData.options.length - 1;
                }
                currentQuestionData.originalRaw.push(line);
            } else if (currentQuestionData && !trimmedLine.startsWith('?')) {
                currentQuestionData.text += " " + trimmedLine;
                currentQuestionData.originalRaw.push(line);
            }
        }
        if (currentQuestionData && currentQuestionData.options.length > 0) {
            parsedQs.push(currentQuestionData);
        }
        return parsedQs.filter(q => q.options.some(opt => opt.isCorrect) && q.options.length > 1);
    }











    function applySettingsAndStartQuiz(isErrorReview = false, questionsSource = null) {
        let sourceArray;
        if (!isErrorReview) {
            quizSettings.timeLimit = parseInt(timeLimitInput.value);
            quizSettings.shuffleQuestions = shuffleQuestionsCheckbox.checked;
            quizSettings.shuffleAnswers = shuffleAnswersCheckbox.checked;
            quizSettings.feedbackMode = feedbackModeCheckbox.checked;
            let startRange = parseInt(questionRangeStartInput.value);
            let endRange = parseInt(questionRangeEndInput.value);
            if (isNaN(startRange) || startRange < 1 || startRange > allParsedQuestions.length) startRange = 1;
            if (isNaN(endRange) || endRange < startRange || endRange > allParsedQuestions.length) endRange = allParsedQuestions.length;
            quizSettings.questionRangeStart = startRange;
            quizSettings.questionRangeEnd = endRange;
            sourceArray = allParsedQuestions.slice(startRange - 1, endRange);
        } else {
            sourceArray = questionsSource;
            quizSettings.timeLimit = 0;
            quizSettings.shuffleQuestions = false;
            quizSettings.shuffleAnswers = shuffleAnswersCheckbox.checked;
        }
        questionsForCurrentQuiz = sourceArray.map(q => {
            const newQ = JSON.parse(JSON.stringify(q));
            newQ.triggeredWordIndices = Array.isArray(q.triggeredWordIndices) ? [...q.triggeredWordIndices] : [];
            return newQ;
        });
        triggerWordsUsedInQuiz = questionsForCurrentQuiz.some(q => q.triggeredWordIndices && q.triggeredWordIndices.length > 0);
        if (quizSettings.shuffleQuestions && !isErrorReview) {
            shuffleArray(questionsForCurrentQuiz);
        }
        questionsForCurrentQuiz.forEach(q => {
            if (quizSettings.shuffleAnswers) {
                const correctAnswerObject = q.options[q.correctAnswerIndex];
                shuffleArray(q.options);
                q.correctAnswerIndex = q.options.findIndex(opt => opt === correctAnswerObject);
            }
        });
        if (questionsForCurrentQuiz.length === 0) {
            alert("Нет вопросов для теста с текущими настройками.");
            return;
        }
        quizSetupArea.classList.add('hidden');
        cheatSheetResultArea.classList.add('hidden');
        gradusFoldersContainer.classList.add('hidden');
        quizArea.classList.remove('hidden');
        resultsArea.classList.add('hidden');
        startQuiz();
    }

    function startQuiz() {
        currentQuestionIndex = 0;
        score = 0;
        userAnswers = new Array(questionsForCurrentQuiz.length).fill(null).map(() => ({ answered: false, correct: null, selectedOptionIndex: null }));
        incorrectlyAnsweredQuestionsData = [];
        totalQuestionsNumEl.textContent = questionsForCurrentQuiz.length;
        updateScoreDisplay();
        setupTimer();
        generateQuickNav();
        webSearchDropdown?.classList.remove('hidden');
        finishTestButton?.classList.remove('hidden');
        copyQuestionBtnQuiz?.classList.remove('hidden');
        getEl('favoriteQuestionBtn')?.classList.remove('hidden');
        languageToggle?.classList.add('hidden');
        quickModeToggle?.classList.remove('hidden');
        triggerWordToggle?.classList.remove('hidden');
        loadQuestion(currentQuestionIndex);
        window.addEventListener('beforeunload', handleBeforeUnload);

    }

    function setupTimer() {
        if (timerInterval) clearInterval(timerInterval);
        if (quizSettings.timeLimit > 0) {
            timeLeftInSeconds = quizSettings.timeLimit * 60;
            timerDisplayEl.classList.remove('hidden');
            updateTimerDisplay();
            timerInterval = setInterval(() => {
                timeLeftInSeconds--;
                updateTimerDisplay();
                if (timeLeftInSeconds <= 0) {
                    clearInterval(timerInterval);
                    showResults();
                }
            }, 1000);
        } else {
            timerDisplayEl.classList.add('hidden');
        }
    }

    function updateTimerDisplay() {
        const minutes = Math.floor(timeLeftInSeconds / 60);
        const seconds = timeLeftInSeconds % 60;
        timeLeftEl.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }

    function generateQuickNav() {
        quickNavButtonsContainer.innerHTML = '';
        if (questionsForCurrentQuiz.length > 1) {
            quickNavPanel.classList.remove('hidden');
            questionsForCurrentQuiz.forEach((_, index) => {
                const btn = document.createElement('button');
                btn.classList.add('quick-nav-btn');
                btn.textContent = index + 1;
                btn.dataset.questionIndex = index;
                btn.addEventListener('click', () => loadQuestion(index));
                quickNavButtonsContainer.appendChild(btn);
            });
        } else {
            quickNavPanel.classList.add('hidden');
        }
    }

    function updateQuickNavButtons() {
        const buttons = quickNavButtonsContainer.querySelectorAll('.quick-nav-btn');
        buttons.forEach((btn) => {
            const btnIndex = parseInt(btn.dataset.questionIndex);
            btn.classList.remove('current', 'answered', 'correct', 'incorrect');
            if (btnIndex === currentQuestionIndex) btn.classList.add('current');
            const answerState = userAnswers[btnIndex];
            if (answerState && answerState.answered) {
                btn.classList.add('answered', answerState.correct ? 'correct' : 'incorrect');
            }
        });
    }

    function loadQuestion(index) {
        if (index < 0 || index >= questionsForCurrentQuiz.length) return;
        currentQuestionIndex = index;
        const question = questionsForCurrentQuiz[index];
        questionTextEl.innerHTML = renderQuestionTextWithTriggers(question);
        addTriggerClickListeners();
        answerOptionsEl.innerHTML = '';
        feedbackAreaEl.textContent = '';
        feedbackAreaEl.className = 'feedback-area';
        question.options.forEach((option, i) => {
            const li = document.createElement('li');
            li.textContent = option.text;
            li.dataset.index = i;
            if (userAnswers[index].answered) {
                li.classList.add('answered');
                if (i === userAnswers[index].selectedOptionIndex) {
                    li.classList.add(userAnswers[index].correct ? 'correct' : 'incorrect');
                }
                if (!userAnswers[index].correct && i === question.correctAnswerIndex) {
                    li.classList.add('actual-correct');
                }
            } else {
                li.addEventListener('click', handleAnswerSelect);
            }
            answerOptionsEl.appendChild(li);
        });
        currentQuestionNumEl.textContent = index + 1;
        updateNavigationButtons();
        updateQuickNavButtons();
    }

    function handleAnswerSelect(event) {
        if (userAnswers[currentQuestionIndex].answered) return;
        const selectedOptionLi = event.target;
        const selectedIndex = parseInt(selectedOptionLi.dataset.index);
        const question = questionsForCurrentQuiz[currentQuestionIndex];
        const isCorrect = selectedIndex === question.correctAnswerIndex;
        userAnswers[currentQuestionIndex] = { answered: true, correct: isCorrect, selectedOptionIndex: selectedIndex };
        if (isCorrect) {
            selectedOptionLi.classList.add('correct');
            feedbackAreaEl.textContent = 'Правильно!';
            feedbackAreaEl.className = 'feedback-area correct-feedback';
            score++;
        } else {
            selectedOptionLi.classList.add('incorrect');
            feedbackAreaEl.textContent = 'Неправильно!';
            feedbackAreaEl.className = 'feedback-area incorrect-feedback';
            const correctLi = answerOptionsEl.querySelector(`li[data-index="${question.correctAnswerIndex}"]`);
            if (correctLi) correctLi.classList.add('actual-correct');
            if (quizSettings.feedbackMode) {
                incorrectlyAnsweredQuestionsData.push(...question.originalRaw, "");
            }
        }
        Array.from(answerOptionsEl.children).forEach(li => {
            li.removeEventListener('click', handleAnswerSelect);
            li.classList.add('answered');
        });
        updateScoreDisplay();
        updateNavigationButtons();
        updateQuickNavButtons();
        if (quickModeEnabled) {
            setTimeout(() => handleNextButtonClick(), QUICK_MODE_DELAY);
        }
    }

    function handleNextButtonClick() {
        if (currentQuestionIndex < questionsForCurrentQuiz.length - 1) {
            loadNextQuestion();
        } else {
            if (timerInterval) clearInterval(timerInterval);
            showResults();
        }
    }
    
    function loadNextQuestion() {
        currentQuestionIndex++;
        loadQuestion(currentQuestionIndex);
    }

    function loadPreviousQuestion() {
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            loadQuestion(currentQuestionIndex);
        }
    }

    function updateNavigationButtons() {
        prevQuestionButton.disabled = currentQuestionIndex === 0;
        const isLastQuestion = currentQuestionIndex === questionsForCurrentQuiz.length - 1;
        nextButton.textContent = isLastQuestion ? 'Завершить тест' : 'Следующий';
        nextButton.classList.toggle('finish-test', isLastQuestion);
    }

    function showResults() {
        window.removeEventListener('beforeunload', handleBeforeUnload);
        if (timerInterval) clearInterval(timerInterval);
        quizArea.classList.add('hidden');
        resultsArea.classList.remove('hidden');
        webSearchDropdown?.classList.add('hidden');
        finishTestButton?.classList.add('hidden');
        copyQuestionBtnQuiz?.classList.add('hidden');
        finalCorrectEl.textContent = score;
        finalTotalEl.textContent = questionsForCurrentQuiz.length;
        const percentage = questionsForCurrentQuiz.length > 0 ? ((score / questionsForCurrentQuiz.length) * 100).toFixed(1) : 0;
        finalPercentageEl.textContent = percentage;
        if (quizSettings.feedbackMode && incorrectlyAnsweredQuestionsData.length > 0) {
            feedbackDownloadArea.classList.remove('hidden');
            errorReviewArea.classList.remove('hidden');
        } else {
            feedbackDownloadArea.classList.add('hidden');
            errorReviewArea.classList.add('hidden');
        }
        if (triggerWordsUsedInQuiz) {
            triggeredQuizDownloadArea.classList.remove('hidden');
        } else {
            triggeredQuizDownloadArea.classList.add('hidden');
        }
    }

    function startErrorReviewQuiz() {
        const errorContent = incorrectlyAnsweredQuestionsData.join('\n');
        const errorQuestions = parseQstContent(errorContent);
        if (errorQuestions.length > 0) {
            resultsArea.classList.add('hidden');
            applySettingsAndStartQuiz(true, errorQuestions);
        } else {
            alert("Не удалось сформировать вопросы для работы над ошибками.");
        }
    }

    function downloadErrorFile() {
        const content = incorrectlyAnsweredQuestionsData.join('\n').trim();
        const fileNameBase = originalFileNameForReview ? originalFileNameForReview.replace(/\.qst$|\.txt$/i, '') : 'test';
        const fileName = `errors_${fileNameBase}.qst`;
        downloadOrShareFile(fileName, content, 'text/plain;charset=utf-8', 'Ошибки');
    }

    function downloadTriggeredQuizFile() {
        let content = '';
        questionsForCurrentQuiz.forEach(q => {
            const tokens = tokenizeText(q.text);
            let questionTextForFile = '? ';
            let wordIdx = 0;
            tokens.forEach(token => {
                const isWord = /\S/.test(token) && !/^[.,;:!?()"“”«»-]+$/.test(token);
                if (isWord) {
                    if (q.triggeredWordIndices?.includes(wordIdx)) {
                        questionTextForFile += `~${token}~`;
                    } else {
                        questionTextForFile += token;
                    }
                    wordIdx++;
                } else {
                    questionTextForFile += token;
                }
            });
            content += questionTextForFile.trim() + '\n';
            q.options.forEach(opt => {
                content += `${opt.isCorrect ? '+' : '-'} ${opt.text}\n`;
            });
            content += '\n';
        });
        const fileNameBase = originalFileNameForReview ? originalFileNameForReview.replace(/\.qst$|\.txt$|\.txt$/i, '') : 'quiz';
        const fileName = `triggered_${fileNameBase}.qst`;
        downloadOrShareFile(fileName, content, 'text/plain;charset=utf-t', 'Тест с триггерами');
    }

    function updateScoreDisplay() {
        correctAnswersCountEl.textContent = score;
    }

    function resetQuizForNewFile(clearInput = true) {
        window.removeEventListener('beforeunload', handleBeforeUnload);
        if (timerInterval) clearInterval(timerInterval);
        allParsedQuestions = [];
        questionsForCurrentQuiz = [];
        currentQuestionIndex = 0;
        score = 0;
        userAnswers = [];
        incorrectlyAnsweredQuestionsData = [];
        originalFileNameForReview = '';
        generatedCheatSheetContent = '';
        triggerWordsUsedInQuiz = false;
        
        const screensToHide = [quizSetupArea, quizArea, resultsArea, cheatSheetResultArea, gradusFoldersContainer, searchResultsContainer];
        screensToHide.forEach(el => el?.classList.add('hidden'));
        fileUploadArea?.classList.remove('hidden');
        
        timerDisplayEl?.classList.add('hidden');
        quickNavPanel?.classList.add('hidden');
        feedbackDownloadArea?.classList.add('hidden');
        errorReviewArea?.classList.add('hidden');
        copyQuestionBtnQuiz?.classList.add('hidden');
        triggeredQuizDownloadArea?.classList.add('hidden');
        finishTestButton?.classList.add('hidden');
        webSearchDropdown?.classList.add('hidden');
        getEl('favoriteQuestionBtn')?.classList.add('hidden');
        languageToggle?.classList.remove('hidden');
        quickModeToggle?.classList.add('hidden');
        triggerWordToggle?.classList.add('hidden');
        
        if (clearInput) fileInput.value = '';
        
        if(questionTextEl) questionTextEl.textContent = '';
        if(answerOptionsEl) answerOptionsEl.innerHTML = '';
        if(feedbackAreaEl) {
            feedbackAreaEl.textContent = '';
            feedbackAreaEl.className = 'feedback-area';
        }
        
        loadRecentFiles();
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function loadTheme() {
        const currentTheme = localStorage.getItem('theme');
        if (currentTheme === 'dark') {
            document.body.classList.add('dark-mode');
            if (themeToggleButton) themeToggleButton.textContent = '☀️';
        } else {
            document.body.classList.remove('dark-mode');
            if (themeToggleButton) themeToggleButton.textContent = '🌙';
        }
    }

    function toggleTheme() {
        document.body.classList.toggle('dark-mode');
        let theme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
        if (themeToggleButton) themeToggleButton.textContent = theme === 'dark' ? '☀️' : '🌙';
        localStorage.setItem('theme', theme);
    }
    


    // --- НОВЫЕ ФУНКЦИИ ДЛЯ ПЕРЕВОДА ЯЗЫКА ---

    function setLanguage(lang) {
        // Сохраняем выбор пользователя
        localStorage.setItem('appLanguage', lang);

        const translations = LANG_PACK[lang];

        // Обновляем текст на всех элементах с атрибутом data-lang-key
        document.querySelectorAll('[data-lang-key]').forEach(el => {
            const key = el.dataset.langKey;
            if (translations[key]) {
                if (el.placeholder) {
                    el.placeholder = translations[key];
                } else {
                    // Используем innerHTML, чтобы сохранить вложенные теги, как в кнопке GRADUS
                    el.innerHTML = translations[key];
                }
            }
        });
        
        // Обновляем title у кнопок
        getEl('languageToggle').title = translations.toggle_language_title;
        getEl('chatToggle').title = translations.chat_button_title;
        getEl('favoriteQuestionBtn').title = translations.favorite_button_title;
        getEl('triggerWordToggle').title = translations.trigger_words_title;
        getEl('quickModeToggle').title = translations.quick_mode_title;
        getEl('themeToggle').title = translations.theme_button_title;

        // Обновляем текст (теперь флаг) на самой кнопке переключения
        if (lang === 'ru') {
            // Если язык интерфейса РУССКИЙ, показываем флаг для переключения на АНГЛИЙСКИЙ
            languageToggle.textContent = 'En'; 
        } else {
            // Если язык интерфейса АНГЛИЙСКИЙ, показываем флаг для переключения на РУССКИЙ
            languageToggle.textContent = 'Ру';
        }
    }

    function toggleLanguage() {
        const currentLang = localStorage.getItem('appLanguage') || 'ru';
        const newLang = currentLang === 'ru' ? 'en' : 'ru';
        setLanguage(newLang);
    }

    function handleCopyQuestionInQuiz() {
        if (currentQuestionIndex >= questionsForCurrentQuiz.length) {
            alert("Не удалось определить текущий вопрос для копирования.");
            return;
        }

        const questionData = questionsForCurrentQuiz[currentQuestionIndex];
        
        // Форматируем в .qst формат
        let qstContent = `? ${questionData.text}\n`;
        questionData.options.forEach(opt => {
            qstContent += `${opt.isCorrect ? '+' : '-'} ${opt.text}\n`;
        });

        // Используем вашу глобальную функцию для копирования
        copyToClipboardMain(qstContent.trim());
    }


    function handleFavoriteClickInQuiz() {
        if (!ChatModule.isInitialized() || !ChatModule.getCurrentUser()) {
            alert("Для использования избранного необходимо войти в аккаунт.");
            ChatModule.openAuthModal();
            return;
        }
        if (currentQuestionIndex >= questionsForCurrentQuiz.length) {
            alert("Не удалось определить текущий вопрос.");
            return;
        }
        const questionData = questionsForCurrentQuiz[currentQuestionIndex];
        const questionObject = {
            text: questionData.text,
            options: questionData.options,
        };
        ChatModule.addToFavorites(questionObject, 'question');
    }

    function handleFavoriteClickInSearch(event, rawQuestionText) {
        event.stopPropagation(); 
        if (!ChatModule.isInitialized() || !ChatModule.getCurrentUser()) {
            alert("Для использования избранного необходимо войти в аккаунт.");
            ChatModule.openAuthModal();
            return;
        }
        
        // ИСПРАВЬТЕ эту строку - уберите escape():
        const cleanText = rawQuestionText.replace(/\\n/g, '\n');
        const parsedQuestion = parseQstContent(`? ${cleanText}`)[0];
        
        if (parsedQuestion) {
            const questionObject = {
                text: parsedQuestion.text,
                options: parsedQuestion.options
            };
            ChatModule.addToFavorites(questionObject, 'question');
        } else {
            alert("Не удалось обработать вопрос для сохранения.");
        }
    }


    function handleCopyClickInSearch(event, rawQuestionText) {
    event.stopPropagation(); // Предотвращаем срабатывание других кликов

    // Текст из базы приходит с экранированными переносами строк (\\n). 
    // Преобразуем их в настоящие переносы (\n).
    const cleanText = rawQuestionText.replace(/\\n/g, '\n');
    
    // Используем вашу же функцию для копирования в буфер обмена
    copyToClipboardMain(cleanText); 
}


    
    function escape(str) {
        if (!str) return '';
        return str.replace(/`/g, '\\`').replace(/\$/g, '\\$').replace(/{/g, '\\{').replace(/}/g, '\\}');
    }

    function escapeHTML(str) {
        const p = document.createElement("p");
        p.textContent = str;
        return p.innerHTML;
    }





    // --- Public methods exposed from mainApp ---
    return {
        init: initializeApp,
        parseQstContent: parseQstContent, 
        processFile: processFile,         
        downloadFile: downloadFileBrowserFallback,
        downloadOrShareFile: downloadOrShareFile,
        handleFavoriteClickInSearch: handleFavoriteClickInSearch,
        handleCopyClickInSearch: handleCopyClickInSearch,
        testMobileDownload: () => {
            console.log('Тестирование мобильного скачивания...');
            console.log('detectMobileDevice():', detectMobileDevice());
            downloadOrShareFile('test.txt', 'Тестовое содержимое файла', 'text/plain', 'Тест');
        }        
    };
})();

document.addEventListener('DOMContentLoaded', mainApp.init);
// Expose mainApp to window for ChatModule access
window.mainApp = mainApp;

// script.js (добавить в конец файла)

// Проверяем, поддерживает ли браузер Service Worker
if ('serviceWorker' in navigator) {
  // Регистрируем наш Service Worker. Лучше делать это после полной загрузки страницы,
  // чтобы не замедлять первоначальное отображение.
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        // Регистрация прошла успешно
        console.log('Service Worker зарегистрирован успешно! Область видимости:', registration.scope);
      })
      .catch(error => {
        // Регистрация не удалась
        console.error('Ошибка регистрации Service Worker:', error);
      });
  });
}