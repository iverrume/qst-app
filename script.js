// ============================================
// ИСПРАВЛЕННЫЙ МОДУЛЬ ЧАТА
// ============================================

const ChatModule = (function() {
    'use strict';

    // === НАЧАЛО НОВОГО БЛОКА: ПЕРЕВОД ЧАТА ===
    const LANG_PACK_CHAT = {
        ru: {
            // TABS
            tab_messages: "Сообщения",
            tab_questions: "Вопросы",
            tab_favorites: "Избранное",
            tab_users: "Пользователи",
            // Auth
            auth_title: "🔐 Авторизация",
            auth_login_tab: "Вход",
            auth_register_tab: "Регистрация",
            auth_login_placeholder: "Имя пользователя или Email",
            auth_password_placeholder: "Пароль",
            auth_login_button: "Войти",
            auth_register_username_placeholder: "Имя пользователя",
            auth_register_email_placeholder: "Email",
            auth_register_password_placeholder: "Пароль (минимум 6 символов)",
            auth_register_confirm_placeholder: "Повторите пароль",
            auth_register_button: "Зарегистрироваться",
            auth_close_button: "Закрыть",
            // Main Chat
            chat_header_title: "💬 Чат",
            guest_user: "Гость",
            generic_user: "Пользователь",
            edit_profile_link: "✏️ Редактировать профиль",
            logout_link: "🚪 Выйти",
            notifications_title: "Уведомления",
            sidebar_sections: "📂 Разделы",
            sidebar_channels: "📋 Каналы",
            sidebar_create_channel: "+ Создать канал",
            sidebar_private_messages: "✉️ Личные сообщения",
            sidebar_online: "👥 Онлайн",
            channel_general: "# Общий",
            search_placeholder: "🔍 Поиск...",
            pinned_toggle_title: "Закрепленные",
            loading_message: "Загрузка...",
            reply_panel_title: "Ответ на сообщение:",
            emoji_button_title: "Эмодзи",
            create_question_button_title: "Создать вопрос",
            attach_file_button_title: "Прикрепить файл",
            chat_input_placeholder: "Введите сообщение...",
            download_qst_button: "📥 Скачать .qst",
            download_txt_button: "📥 Скачать .txt",
            add_to_favorites_button: "⭐ В избранное",
            copy_question_button: "📋 Копировать",
            delete_question_button: "🗑️ Удалить вопрос",
            clear_favorites_button: "🗑️", 
            question_label: "Вопрос:",
            author_label: "Автор:",
            date_label: "Дата:",
            anonymous_user: "Аноним",
            expand_message: "Развернуть", 
            collapse_message: "Свернуть", 
            // Modals
            user_actions_title: "Действия",
            user_actions_text: "Выберите, что вы хотите сделать.",
            user_actions_chat_button: "Написать в чате",
            user_actions_email_button: "Написать на Email",
            modal_cancel_button: "Отмена",
            channel_settings_title: "Настройки канала",
            channel_edit_name_placeholder: "Новое название канала",
            channel_edit_password_placeholder: "Новый пароль (пусто = без пароля)",
            channel_edit_desc_placeholder: "Новое описание канала",
            channel_members_title: "Участники канала",
            channel_members_loading: "Загрузка...",
            modal_save_button: "Сохранить",
            delete_channel_button: "🗑️ Удалить Канал",
            create_channel_title: "Создать новый канал",
            channel_create_name_placeholder: "Название канала",
            channel_create_password_placeholder: "Пароль (оставьте пустым для публичного)",
            channel_create_desc_placeholder: "Описание канала",
            modal_create_button: "Создать",
            create_question_title: "Создать вопрос",
            create_question_placeholder: `Введите ваш вопрос в формате .qst

?Столица Казахстана
+Астана
-Нур-Султан
-Утера

*Можно ввести сразу несколько`,
            create_question_modal_button: "Создать вопрос",
            edit_message_title: "Редактировать сообщение",
            edit_profile_title: "Редактировать профиль",
            edit_profile_name_placeholder: "Ваше имя",
            edit_profile_new_password_placeholder: "Новый пароль (оставьте пустым, если не меняете)",
            delete_account_button: "🗑️ Удалить аккаунт",
            file_actions_title: "Действия с файлом",
            file_actions_download: "📥 Скачать",
            file_actions_test: "⚡️ Пройти тест",
            // JS Messages & Alerts
            auth_system_unavailable: "Система аутентификации не доступна",
            fill_all_fields: "Заполните все поля",
            password_min_length: "Пароль должен содержать минимум 6 символов",
            passwords_do_not_match: "Пароли не совпадают!",
            error_user_not_found: "Пользователь не найден",
            error_wrong_password: "Неверный пароль",
            error_email_in_use: "Email уже используется",
            error_weak_password: "Слишком слабый пароль",
            error_invalid_email: "Неверный формат email",
            error_too_many_requests: "Слишком много попыток. Попробуйте позже",
            error_generic: "Произошла ошибка. Попробуйте еще раз",
            loading_messages: "Загрузка сообщений...",
            loading_error: "Ошибка загрузки.",
            pinned_messages_empty: "Закрепленных сообщений пока нет",
            messages_empty: "Сообщений пока нет. Напишите первым!",
            file_share_question_1: "вопрос",
            file_share_question_2_4: "вопроса",
            file_share_question_5_more: "вопросов",
            new_question_notification: "Создан новый вопрос",
            notification_new_message: "Новое сообщение!",
            questions_empty: "Вопросов пока нет",
            favorites_empty: "В избранном пока ничего нет",
            favorites_loading_error: "Ошибка загрузки избранного",
            users_not_found: "Пользователи не найдены.",
            confirm_delete_message: "Вы уверены, что хотите удалить это сообщение?",
            confirm_delete_question: "Вы уверены, что хотите удалить этот вопрос? Это действие необратимо.",
            confirm_kick_user: "Вы уверены, что хотите удалить этого участника из канала?",
            confirm_delete_channel: "Вы уверены, что хотите удалить этот канал? Все сообщения в нем будут потеряны. Это действие необратимо.",
            confirm_delete_account: "Вы уверены, что хотите удалить свой аккаунт? Это действие НЕОБРАТИМО.",
            confirm_clear_favorites: "Вы уверены, что хотите удалить ВСЕ элементы из избранного? Это действие необратимо.",
            profile_updated_success: "Профиль успешно обновлен!",
            channel_name_empty: "Название канала не может быть пустым.",
            cant_delete_general: "Основной канал удалить нельзя.",
            invalid_channel_password: "Неверный пароль.",
            add_to_favorites_success: "Добавлено в избранное!",
            add_to_favorites_auth_required: "Для добавления в избранное необходимо авторизоваться.",
            question_format_unrecognized: "Формат вопроса не распознан. Проверьте синтаксис.",
            questions_added_from_chat_success: "Успешно добавлено вопросов из чата:",
            questions_added_success: "Успешно добавлено вопросов:",
            notifications_enabled: "Звуковые уведомления включены",
            notifications_disabled: "Звуковые уведомления выключены",
            notifications_title_enabled: "Уведомления включены",
            notifications_title_disabled: "Уведомления выключены",
            pinned_mode_on_title: "Показать все сообщения",
            pinned_mode_off_title: "Показать закрепленные",
            download_qst_button: "📥 Скачать .qst",
            download_txt_button: "📥 Скачать .txt",
            clear_favorites_button: "🗑️",
            download_no_data: "Нет данных для скачивания в разделе",
            favorites_cleared_success: "Избранное успешно очищено.",
            favorites_already_empty: "Избранное уже пусто.",
            copy_success: "Содержимое скопировано в буфер обмена!",
            copy_error: "Не удалось скопировать. Скопируйте текст вручную.",
            file_type_unsupported: "Можно загружать только файлы .qst и .txt",
            reauth_prompt: "Для подтверждения удаления, пожалуйста, введите ваш текущий пароль:",
            reauth_cancelled: "Удаление отменено. Пароль не был введен.",
            deleting_account_status: "Удаление...",
            delete_account_success: "Ваш аккаунт был успешно удален.",
            account_deleted_button: "🗑️ Удалить аккаунт",
            question_deleted_message: "Этот вопрос был удален.",
            file_download_error: "Не удалось скачать файл:",
            test_start_error: "Не удалось запустить тест:",
            global_loader_loading_test: "Загрузка теста",
            password_reauth_required: "Для выполнения этого действия необходимо недавно войти в систему. Пожалуйста, выйдите и войдите снова.",
            channel_enter_password_prompt: "защищен. Введите пароль:",
            question_card_question_label: "Вопрос:",
            question_card_author_label: "Автор:",
            question_card_date_label: "Дата:",
            question_card_anonymous: "Аноним",
        },
        kz: {
            // TABS
            tab_messages: "Хабарламалар",
            tab_questions: "Сұрақтар",
            tab_favorites: "Таңдаулылар",
            tab_users: "Пайдаланушылар",
            // Auth
            auth_title: "🔐 Авторизаттау",
            auth_login_tab: "Кіру",
            auth_register_tab: "Тіркелу",
            auth_login_placeholder: "Пайдаланушы аты немесе Email",
            auth_password_placeholder: "Құпия сөз",
            auth_login_button: "Кіру",
            auth_register_username_placeholder: "Пайдаланушы аты",
            auth_register_email_placeholder: "Email",
            auth_register_password_placeholder: "Құпия сөз (кемінде 6 таңба)",
            auth_register_confirm_placeholder: "Құпия сөзді қайталаңыз",
            auth_register_button: "Тіркелу",
            auth_close_button: "Жабу",
            // Main Chat
            chat_header_title: "💬 Чат",
            guest_user: "Қонақ",
            generic_user: "Пайдаланушы",
            edit_profile_link: "✏️ Профильді өңдеу",
            logout_link: "🚪 Шығу",
            notifications_title: "Хабарландырулар",
            sidebar_sections: "📂 Бөлімдер",
            sidebar_channels: "📋 Арналар",
            sidebar_create_channel: "+ Арна құру",
            sidebar_private_messages: "✉️ Жеке хабарламалар",
            sidebar_online: "👥 Желіде",
            channel_general: "# Жалпы",
            search_placeholder: "🔍 Іздеу...",
            pinned_toggle_title: "Бекітілгендер",
            loading_message: "Жүктелуде...",
            reply_panel_title: "Жауап беру:",
            emoji_button_title: "Эмодзи",
            create_question_button_title: "Сұрақ құру",
            attach_file_button_title: "Файлды тіркеу",
            chat_input_placeholder: "Хабарлама енгізіңіз...",
            question_label: "Сұрақ:",
            author_label: "Авторы:",
            date_label: "Күні:",
            anonymous_user: "Аноним",
            expand_message: "Көбірек көрсету", 
            collapse_message: "Жасыру", 
            // Modals
            user_actions_title: "Әрекеттер",
            user_actions_text: "Не істегіңіз келетінін таңдаңыз.",
            user_actions_chat_button: "Чатта жазу",
            user_actions_email_button: "Email-ге жазу",
            modal_cancel_button: "Болдырмау",
            channel_settings_title: "Арна баптаулары",
            channel_edit_name_placeholder: "Арнаның жаңа атауы",
            channel_edit_password_placeholder: "Жаңа құпия сөз (бос = құпия сөзсіз)",
            channel_edit_desc_placeholder: "Арнаның жаңа сипаттамасы",
            channel_members_title: "Арна мүшелері",
            channel_members_loading: "Жүктелуде...",
            modal_save_button: "Сақтау",
            delete_channel_button: "🗑️ Арнаны жою",
            create_channel_title: "Жаңа арна құру",
            channel_create_name_placeholder: "Арна атауы",
            channel_create_password_placeholder: "Құпия сөз (жалпыға ортақ үшін бос қалдырыңыз)",
            channel_create_desc_placeholder: "Арна сипаттамасы",
            modal_create_button: "Құру",
            create_question_title: "Сұрақ құру",
            create_question_placeholder: `Сұрағыңызды .qst пішімінде енгізіңіз

?Қазақстанның астанасы
+Астана
-Нұр-Сұлтан
-Утера

*Бірден бірнеше сұрақ енгізуге болады`,
            create_question_modal_button: "Сұрақты құру",
            edit_message_title: "Хабарламаны өңдеу",
            edit_profile_title: "Профильді өңдеу",
            edit_profile_name_placeholder: "Сіздің атыңыз",
            edit_profile_new_password_placeholder: "Жаңа құпия сөз (өзгертпесеңіз бос қалдырыңыз)",
            delete_account_button: "🗑️ Аккаунтты жою",
            file_actions_title: "Файл әрекеттері",
            file_actions_download: "📥 Жүктеп алу",
            file_actions_test: "⚡️ Тест өту",
            // JS Messages & Alerts
            auth_system_unavailable: "Авторизация жүйесі қолжетімсіз",
            fill_all_fields: "Барлық өрістерді толтырыңыз",
            password_min_length: "Құпия сөз кемінде 6 таңбадан тұруы керек",
            passwords_do_not_match: "Құпия сөздер сәйкес келмейді!",
            error_user_not_found: "Пайдаланушы табылмады",
            error_wrong_password: "Қате құпия сөз",
            error_email_in_use: "Email қазірдің өзінде қолданыста",
            error_weak_password: "Тым әлсіз құпия сөз",
            error_invalid_email: "Жарамсыз email пішімі",
            error_too_many_requests: "Тым көп әрекет. Кейінірек қайталап көріңіз",
            error_generic: "Қате пайда болды. Қайталап көріңіз",
            loading_messages: "Хабарламалар жүктелуде...",
            loading_error: "Жүктеу қатесі.",
            pinned_messages_empty: "Бекітілген хабарламалар әзірге жоқ",
            messages_empty: "Хабарламалар әзірге жоқ. Бірінші болып жазыңыз!",
            file_share_question_1: "сұрақ",
            file_share_question_2_4: "сұрақ",
            file_share_question_5_more: "сұрақ",
            new_question_notification: "Жаңа сұрақ құрылды",
            notification_new_message: "Жаңа хабарлама!",
            questions_empty: "Сұрақтар әзірге жоқ",
            favorites_empty: "Таңдаулыларда әзірге ештеңе жоқ",
            favorites_loading_error: "Таңдаулыларды жүктеу қатесі",
            users_not_found: "Пайдаланушылар табылмады.",
            confirm_delete_message: "Осы хабарламаны жойғыңыз келетініне сенімдісіз бе?",
            confirm_delete_question: "Осы сұрақты жойғыңыз келетініне сенімдісіз бе? Бұл әрекетті қайтару мүмкін емес.",
            confirm_kick_user: "Осы мүшені арнадан алғыңыз келетініне сенімдісіз бе?",
            confirm_delete_channel: "Осы арнаны жойғыңыз келетініне сенімдісіз бе? Ондағы барлық хабарламалар жоғалады. Бұл әрекетті қайтару мүмкін емес.",
            confirm_delete_account: "Аккаунтыңызды жойғыңыз келетініне сенімдісіз бе? Бұл әрекетті ҚАЙТАРУ МҮМКІН ЕМЕС.",
            confirm_clear_favorites: "Таңдаулылардан БАРЛЫҚ элементтерді жойғыңыз келетініне сенімдісіз бе? Бұл әрекетті қайтару мүмкін емес.",
            profile_updated_success: "Профиль сәтті жаңартылды!",
            channel_name_empty: "Арна атауы бос болмауы керек.",
            cant_delete_general: "Негізгі арнаны жою мүмкін емес.",
            invalid_channel_password: "Қате құпия сөз.",
            add_to_favorites_success: "Таңдаулыларға қосылды!",
            add_to_favorites_auth_required: "Таңдаулыларға қосу үшін авторизациядан өту қажет.",
            question_format_unrecognized: "Сұрақ пішімі танылмады. Синтаксисті тексеріңіз.",
            questions_added_from_chat_success: "Чаттан сәтті қосылған сұрақтар саны:",
            questions_added_success: "Сәтті қосылған сұрақтар саны:",
            notifications_enabled: "Дыбыстық хабарландырулар қосулы",
            notifications_disabled: "Дыбыстық хабарландырулар өшірулі",
            notifications_title_enabled: "Хабарландырулар қосулы",
            notifications_title_disabled: "Хабарландырулар өшірулі",
            pinned_mode_on_title: "Барлық хабарламаларды көрсету",
            pinned_mode_off_title: "Бекітілгендерді көрсету",
            download_qst_button: "📥 .qst жүктеп алу",
            download_txt_button: "📥 .txt жүктеп алу",
            add_to_favorites_button: "⭐ Таңдаулыларға қосу",
            copy_question_button: "📋 Көшіру",
            delete_question_button: "🗑️ Сұрақты жою",
            clear_favorites_button: "🗑️",
            download_no_data: "бөлімінде жүктеуге деректер жоқ",
            favorites_cleared_success: "Таңдаулылар сәтті тазартылды.",
            favorites_already_empty: "Таңдаулылар қазірдің өзінде бос.",
            copy_success: "Мазмұн алмасу буферіне көшірілді!",
            copy_error: "Көшіру мүмкін болмады. Мәтінді қолмен көшіріңіз.",
            file_type_unsupported: "Тек .qst және .txt файлдарын жүктеуге болады",
            reauth_prompt: "Жоюды растау үшін ағымдағы құпия сөзіңізді енгізіңіз:",
            reauth_cancelled: "Жою болдырылмады. Құпия сөз енгізілмеді.",
            deleting_account_status: "Жойылуда...",
            delete_account_success: "Сіздің аккаунтыңыз сәтті жойылды.",
            account_deleted_button: "🗑️ Аккаунтты жою",
            question_deleted_message: "Бұл сұрақ жойылды.",
            file_download_error: "Файлды жүктеу мүмкін болмады:",
            test_start_error: "Тестті бастау мүмкін болмады:",
            global_loader_loading_test: "Тест жүктелуде",
            password_reauth_required: "Бұл әрекетті орындау үшін жақында кіру қажет. Шығып, қайта кіріңіз.",
            channel_enter_password_prompt: "арнасы қорғалған. Құпия сөзді енгізіңіз:",
            question_card_question_label: "Сұрақ:",
            question_card_author_label: "Авторы:",
            question_card_date_label: "Күні:",
            question_card_anonymous: "Аноним",
        },
        en: {
            // TABS
            tab_messages: "Messages",
            tab_questions: "Questions",
            tab_favorites: "Favorites",
            tab_users: "Users",
            // Auth
            auth_title: "🔐 Authorization",
            auth_login_tab: "Login",
            auth_register_tab: "Register",
            auth_login_placeholder: "Username or Email",
            auth_password_placeholder: "Password",
            auth_login_button: "Log In",
            auth_register_username_placeholder: "Username",
            auth_register_email_placeholder: "Email",
            auth_register_password_placeholder: "Password (min. 6 characters)",
            auth_register_confirm_placeholder: "Confirm password",
            auth_register_button: "Register",
            auth_close_button: "Close",
            // Main Chat
            chat_header_title: "💬 Chat",
            guest_user: "Guest",
            generic_user: "User",
            edit_profile_link: "✏️ Edit Profile",
            logout_link: "🚪 Logout",
            notifications_title: "Notifications",
            sidebar_sections: "📂 Sections",
            sidebar_channels: "📋 Channels",
            sidebar_create_channel: "+ Create Channel",
            sidebar_private_messages: "✉️ Private Messages",
            sidebar_online: "👥 Online",
            channel_general: "# General",
            search_placeholder: "🔍 Search...",
            pinned_toggle_title: "Pinned",
            loading_message: "Loading...",
            reply_panel_title: "Replying to:",
            emoji_button_title: "Emoji",
            create_question_button_title: "Create Question",
            attach_file_button_title: "Attach File",
            chat_input_placeholder: "Enter a message...",
            // Modals
            user_actions_title: "Actions",
            user_actions_text: "Choose what you want to do.",
            user_actions_chat_button: "Send a message",
            user_actions_email_button: "Send an Email",
            modal_cancel_button: "Cancel",
            channel_settings_title: "Channel Settings",
            channel_edit_name_placeholder: "New channel name",
            channel_edit_password_placeholder: "New password (empty = no password)",
            channel_edit_desc_placeholder: "New channel description",
            channel_members_title: "Channel Members",
            channel_members_loading: "Loading...",
            modal_save_button: "Save",
            delete_channel_button: "🗑️ Delete Channel",
            create_channel_title: "Create New Channel",
            channel_create_name_placeholder: "Channel name",
            channel_create_password_placeholder: "Password (leave empty for public)",
            channel_create_desc_placeholder: "Channel description",
            modal_create_button: "Create",
            create_question_title: "Create Question",

            create_question_placeholder: `Enter your question in .qst format

?Capital of Kazakhstan
+Astana
-Nur-Sultan
-Utera

*You can enter multiple questions at once`,
            create_question_modal_button: "Create Question",
            edit_message_title: "Edit Message",
            edit_profile_title: "Edit Profile",
            edit_profile_name_placeholder: "Your name",
            edit_profile_new_password_placeholder: "New password (leave empty if not changing)",
            delete_account_button: "🗑️ Delete Account",
            file_actions_title: "File Actions",
            file_actions_download: "📥 Download",
            file_actions_test: "⚡️ Take Test",
            // JS Messages & Alerts
            auth_system_unavailable: "Authentication system is not available",
            fill_all_fields: "Please fill in all fields",
            password_min_length: "Password must be at least 6 characters long",
            passwords_do_not_match: "Passwords do not match!",
            error_user_not_found: "User not found",
            error_wrong_password: "Incorrect password",
            error_email_in_use: "Email is already in use",
            error_weak_password: "Password is too weak",
            error_invalid_email: "Invalid email format",
            error_too_many_requests: "Too many requests. Please try again later",
            error_generic: "An error occurred. Please try again",
            loading_messages: "Loading messages...",
            loading_error: "Loading error.",
            pinned_messages_empty: "No pinned messages yet",
            messages_empty: "No messages yet. Be the first to write!",
            file_share_question_1: "question",
            file_share_question_2_4: "questions",
            file_share_question_5_more: "questions",
            new_question_notification: "A new question has been created",
            notification_new_message: "New message!",
            questions_empty: "No questions yet",
            favorites_empty: "Nothing in favorites yet",
            favorites_loading_error: "Error loading favorites",
            users_not_found: "Users not found.",
            confirm_delete_message: "Are you sure you want to delete this message?",
            confirm_delete_question: "Are you sure you want to delete this question? This action is irreversible.",
            confirm_kick_user: "Are you sure you want to remove this member from the channel?",
            confirm_delete_channel: "Are you sure you want to delete this channel? All messages within it will be lost. This action is irreversible.",
            confirm_delete_account: "Are you sure you want to delete your account? This action is IRREVERSIBLE.",
            confirm_clear_favorites: "Are you sure you want to delete ALL items from your favorites? This action is irreversible.",
            profile_updated_success: "Profile updated successfully!",
            channel_name_empty: "Channel name cannot be empty.",
            cant_delete_general: "The main channel cannot be deleted.",
            invalid_channel_password: "Incorrect password.",
            add_to_favorites_success: "Added to favorites!",
            add_to_favorites_auth_required: "You must be logged in to add to favorites.",
            question_format_unrecognized: "Question format not recognized. Please check the syntax.",
            questions_added_from_chat_success: "Successfully added questions from chat:",
            questions_added_success: "Successfully added questions:",
            notifications_enabled: "Sound notifications are enabled",
            notifications_disabled: "Sound notifications are disabled",
            notifications_title_enabled: "Notifications on",
            notifications_title_disabled: "Notifications off",
            pinned_mode_on_title: "Show all messages",
            pinned_mode_off_title: "Show pinned messages",
            download_qst_button: "📥 Download .qst",
            download_txt_button: "📥 Download .txt",
            add_to_favorites_button: "⭐ Add to Favorites",
            copy_question_button: "📋 Copy",
            delete_question_button: "🗑️ Delete Question",
            clear_favorites_button: "🗑️",
            question_label: "Question:",
            author_label: "Author:",
            date_label: "Date:",
            anonymous_user: "Anonymous",
            expand_message: "Read more", 
            collapse_message: "Show less", 
            download_no_data: "No data to download in section",
            favorites_cleared_success: "Favorites cleared successfully.",
            favorites_already_empty: "Favorites is already empty.",
            copy_success: "Content copied to clipboard!",
            copy_error: "Could not copy. Please copy the text manually.",
            file_type_unsupported: "Only .qst and .txt files can be uploaded",
            reauth_prompt: "To confirm deletion, please enter your current password:",
            reauth_cancelled: "Deletion cancelled. Password was not entered.",
            deleting_account_status: "Deleting...",
            delete_account_success: "Your account has been successfully deleted.",
            account_deleted_button: "🗑️ Delete Account",
            question_deleted_message: "This question has been deleted.",
            file_download_error: "Failed to download file:",
            test_start_error: "Failed to start test:",
            global_loader_loading_test: "Loading test",
            password_reauth_required: "This action requires a recent login. Please log out and log in again.",
            channel_enter_password_prompt: "is protected. Please enter the password:",
            question_card_question_label: "Question:",
            question_card_author_label: "Author:",
            question_card_date_label: "Date:",
            question_card_anonymous: "Anonymous",
        }
    };
    let currentChatLang = localStorage.getItem('chatLanguage') || 'ru';

    function _chat(key) {
        return LANG_PACK_CHAT[currentChatLang]?.[key] || key;
    }

    
    // Core variables
    let db = null;
    let auth = null;
    let currentUser = null;
    let allMessages = [];
    let openChatAfterAuth = false;
    let currentChannel = 'general';
    let currentChannelType = 'public'; // 'public' или 'private'
    let currentTab = 'messages';
    let channels = [];
    let privateChats = []; // Для хранения активных личных чатов
    let allUsers = new Map(); // Хранит всех пользователей
    let onlineUsers = new Map(); // Используем Map для хранения полной информации
    let isInitialized = false;
    let unreadCounts = new Map();
    let replyContext = null;
    let presenceListener = null;
    let heartbeatInterval = null; // Для "пульса"
    let notificationsEnabled = true;
    let originalTitle = document.title;
    let unreadMessageCount = 0; 
    let isPinnedMode = false;

    let messagesListener = null; // Cлушатель для сообщений
    let pmUnreadListener = null; // Слушатель для ЛИЧНЫХ непрочитанных
    let publicUnreadListener = null; // Слушатель для ПУБЛИЧНЫХ непрочитанных
    let listenerInitializationTime = null; // ВРЕМЯ ЗАПУСКА СЛУШАТЕЛЯ

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
        messages: { langKey: 'tab_messages', icon: '💬', collection: 'messages' },
        questions: { langKey: 'tab_questions', icon: '❓', collection: 'questions' },
        favorites: { langKey: 'tab_favorites', icon: '⭐', collection: 'favorites' },
        users: { langKey: 'tab_users', icon: '👥' }
    };


    // --- НАЧАЛО НОВОГО КОДА: Вставляем функции сюда ---
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    };

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
    // --- КОНЕЦ НОВОГО КОДА ---




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
        
        // Вся HTML-строка обернута в обратные кавычки (`) для использования ${}
        const chatHTML = `
        <!-- СИСТЕМА АУТЕНТИФИКАЦИИ -->
        <div id="authOverlay" class="auth-overlay hidden">
            <div class="auth-modal">
                <h2 style="margin-bottom: 20px; color: var(--primary);">${_chat('auth_title')}</h2>
                <div class="auth-tabs">
                    <button class="auth-tab active" data-tab="login">${_chat('auth_login_tab')}</button>
                    <button class="auth-tab" data-tab="register">${_chat('auth_register_tab')}</button>
                </div>
                <form class="auth-form active" id="loginForm">
                    <input type="text" class="auth-input" id="loginUsername" placeholder="${_chat('auth_login_placeholder')}" required>
                    <input type="password" class="auth-input" id="loginPassword" placeholder="${_chat('auth_password_placeholder')}" required>
                    <button type="submit" class="auth-btn">${_chat('auth_login_button')}</button>
                </form>
                <form class="auth-form" id="registerForm">
                    <input type="text" class="auth-input" id="registerUsername" placeholder="${_chat('auth_register_username_placeholder')}" required>
                    <input type="email" class="auth-input" id="registerEmail" placeholder="${_chat('auth_register_email_placeholder')}" required>

                    <div class="password-wrapper">
                        <input type="password" class="auth-input" id="registerPassword" placeholder="${_chat('auth_register_password_placeholder')}" required>
                        <span class="toggle-password">👁️</span>
                    </div>

                    <div class="password-wrapper">
                        <input type="password" class="auth-input" id="registerPasswordConfirm" placeholder="${_chat('auth_register_confirm_placeholder')}" required>
                        <span class="toggle-password">👁️</span>
                    </div>

                    <button type="submit" class="auth-btn">${_chat('auth_register_button')}</button>
                </form>
                <button onclick="ChatModule.closeAuthModal()" style="margin-top: 15px; background: none; border: none; color: var(--secondary-text-color); cursor: pointer;">
                    ${_chat('auth_close_button')}
                </button>
            </div>
        </div>

        <!-- ГИБРИДНЫЙ ЧАТ -->
        <div id="chatOverlay" class="advanced-chat-overlay hidden">
            <div class="advanced-chat-modal">
                <!-- Header -->

                <div class="advanced-chat-header">
                    <div class="chat-title">
                        <h3 id="chatHeaderTitle">${_chat('chat_header_title')}</h3>
                        <span id="unreadBadge" class="unread-badge hidden">0</span>
                    </div>
                    <button id="sidebarToggleBtn" class="sidebar-toggle-btn">☰</button>

                    <div class="header-controls">
                        <div class="user-menu-container">
                            <span id="currentUser">${_chat('guest_user')}</span>
                            <div id="userDropdown" class="user-dropdown hidden">
                                <a href="#" onclick="ChatModule.showProfileModal()">${_chat('edit_profile_link')}</a>
                                <a href="#" onclick="ChatModule.logout()">${_chat('logout_link')}</a>
                            </div>
                        </div>
                        <button id="notificationToggle" class="notification-toggle" title="${_chat('notifications_title')}">🔔</button>
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
                                <h4>${_chat('sidebar_sections')}</h4>
                                <div id="chatTabsList" class="tabs-list">
                                    <div class="tab-item active" data-tab="messages">
                                        <span class="tab-icon">💬</span><span class="tab-name">${_chat('tab_messages')}</span><span class="tab-counter" id="messagesCount">0</span>
                                    </div>
                                    <div class="tab-item" data-tab="questions">
                                        <span class="tab-icon">❓</span><span class="tab-name">${_chat('tab_questions')}</span><span class="tab-counter" id="questionsCount">0</span>
                                    </div>
                                    <div class="tab-item" data-tab="favorites">
                                        <span class="tab-icon">⭐</span><span class="tab-name">${_chat('tab_favorites')}</span><span class="tab-counter" id="favoritesCount">0</span>
                                    </div>
                                    <div class="tab-item" data-tab="users">
                                        <span class="tab-icon">👥</span><span class="tab-name">${_chat('tab_users')}</span><span class="tab-counter" id="usersCount">0</span>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Channels -->
                            <div class="sidebar-section">
                                <h4>${_chat('sidebar_channels')}</h4>
                                <div id="channelsList" class="channels-list"></div>
                                <button id="createChannelBtn" class="create-btn">${_chat('sidebar_create_channel')}</button>
                            </div>

                            <!-- Private Messages -->
                            <div class="sidebar-section" id="privateChatsSection">
                                <h4>${_chat('sidebar_private_messages')}</h4>
                                <div id="privateChatsList" class="channels-list"></div>
                            </div>
                            
                            <!-- Online users -->
                            <div class="sidebar-section">
                                <h4>${_chat('sidebar_online')} (<span id="onlineCount">0</span>)</h4>
                                <div id="onlineUsersList" class="online-users-list"></div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Main chat area -->
                    <div class="chat-main-content">
                        <div class="chat-top-bar">
                             <h4 id="currentChannelName" style="margin: 0; flex-grow: 1; text-align: left; color: var(--heading-color);">${_chat('channel_general')}</h4>
                            <input type="text" id="chatSearchInput" placeholder="${_chat('search_placeholder')}" />
                            <button id="togglePinnedBtn" title="${_chat('pinned_toggle_title')}">📌</button>
                        </div>
                        
                        <div id="tabActionsContainer" class="tab-actions-container hidden"></div>
                        
                        <div id="messageArea" class="message-area">
                            <div class="empty-state">${_chat('loading_message')}</div>
                        </div>
                        
                        <div class="chat-input-area">
                            <div id="replyingToPanel" class="replying-to-panel hidden">
                                <div class="reply-info"><span>${_chat('reply_panel_title')}</span><p id="replyingToText"></p></div>
                                <button onclick="ChatModule.cancelReply()" class="cancel-reply-btn">×</button>
                            </div>
                            
                            <!-- НОВАЯ СТРУКТУРА ДЛЯ КНОПОК НАД ПОЛЕМ ВВОДА -->
                            <div class="input-actions-top">
                                <button id="emojiBtn" class="input-action-btn" title="${_chat('emoji_button_title')}">😊</button>
                                <button id="questionBtn" class="input-action-btn" title="${_chat('create_question_button_title')}">❓</button>
                                <button id="uploadFileBtn" class="input-action-btn" title="${_chat('attach_file_button_title')}">📎</button>
                            </div>

                            <input type="file" id="chatFileInput" class="hidden" accept=".qst,.txt">
                            
                            <div class="input-wrapper">
                                <textarea id="chatInput" placeholder="${_chat('chat_input_placeholder')}"></textarea>
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
                <h3 id="userActionsModalTitle">${_chat('user_actions_title')}</h3>
                <p id="userActionsModalText" style="margin-bottom: 25px;">${_chat('user_actions_text')}</p>
                <div class="modal-buttons vertical">
                    <button id="userActionsChatBtn">${_chat('user_actions_chat_button')}</button>
                    <button id="userActionsEmailBtn">${_chat('user_actions_email_button')}</button>
                    <button onclick="ChatModule.closeModal('userActionsModal')" style="background-color: var(--button-secondary-bg); color: var(--button-secondary-text);">${_chat('modal_cancel_button')}</button>
                </div>
            </div>
        </div>
        <div id="channelEditModal" class="modal-overlay hidden">
            <div class="modal-content">
                <h3>${_chat('channel_settings_title')}</h3>
                <input type="hidden" id="editChannelId">
                <input type="text" id="editChannelNameInput" placeholder="${_chat('channel_edit_name_placeholder')}" required />
                <input type="password" id="editChannelPasswordInput" placeholder="${_chat('channel_edit_password_placeholder')}" />
                <textarea id="editChannelDescInput" placeholder="${_chat('channel_edit_desc_placeholder')}"></textarea>

                <div id="channelMembersSection" class="channel-members-section hidden">
                    <h4>${_chat('channel_members_title')}</h4>
                    <ul id="channelMembersList" class="channel-members-list"><li>${_chat('channel_members_loading')}</li></ul>
                </div>

                <div class="modal-buttons">
                    <button onclick="ChatModule.saveChannelEdit()">${_chat('modal_save_button')}</button>
                    <button onclick="ChatModule.closeModal('channelEditModal')">${_chat('modal_cancel_button')}</button>
                </div>
                <button id="deleteChannelBtn" class="delete-btn" onclick="ChatModule.deleteChannel()" style="margin-top: 15px;">${_chat('delete_channel_button')}</button>
            </div>
        </div>
        <div id="channelCreateModal" class="modal-overlay hidden">
            <div class="modal-content">
                <h3>${_chat('create_channel_title')}</h3>
                <input type="text" id="channelNameInput" placeholder="${_chat('channel_create_name_placeholder')}" required />
                <input type="password" id="channelPasswordInput" placeholder="${_chat('channel_create_password_placeholder')}" />
                <textarea id="channelDescInput" placeholder="${_chat('channel_create_desc_placeholder')}"></textarea>
                <div class="modal-buttons">
                    <button onclick="ChatModule.createChannel()">${_chat('modal_create_button')}</button>
                    <button onclick="ChatModule.closeModal('channelCreateModal')">${_chat('modal_cancel_button')}</button>
                </div>
            </div>
        </div>
        <div id="questionCreateModal" class="modal-overlay hidden">
            <div class="modal-content">
                <h3>${_chat('create_question_title')}</h3>
                <textarea id="questionTextInput" placeholder="${_chat('create_question_placeholder')}" rows="4"></textarea>
                <div class="modal-buttons">
                    <button onclick="ChatModule.createQuestion()">${_chat('create_question_modal_button')}</button>
                    <button onclick="ChatModule.closeModal('questionCreateModal')">${_chat('modal_cancel_button')}</button>
                </div>
            </div>
        </div>
        <div id="editMessageModal" class="modal-overlay hidden">
            <div class="modal-content">
                <h3>${_chat('edit_message_title')}</h3>
                <textarea id="editMessageInput" rows="4"></textarea>
                <input type="hidden" id="editMessageIdInput">
                <div class="modal-buttons">
                    <button onclick="ChatModule.saveMessageEdit()">${_chat('modal_save_button')}</button>
                    <button onclick="ChatModule.closeModal('editMessageModal')">${_chat('modal_cancel_button')}</button>
                </div>
            </div>
        </div>
        <div id="profileEditModal" class="modal-overlay hidden">
            <div class="modal-content">
                <h3>${_chat('edit_profile_title')}</h3>
                <input type="text" id="profileDisplayName" placeholder="${_chat('edit_profile_name_placeholder')}" />
                <input type="email" id="profileEmail" placeholder="Email" readonly />
                <input type="password" id="profileNewPassword" placeholder="${_chat('edit_profile_new_password_placeholder')}" />
                <div class="modal-buttons">
                    <button onclick="ChatModule.saveProfile()">${_chat('modal_save_button')}</button>
                    <button onclick="ChatModule.closeModal('profileEditModal')">${_chat('modal_cancel_button')}</button>
                </div>
                <button id="deleteAccountBtn" class="delete-btn" onclick="ChatModule.deleteAccount()" style="margin-top: 15px;">${_chat('delete_account_button')}</button>
            </div>
        </div>

        <div id="fileActionsModal" class="modal-overlay hidden">
            <div class="modal-content">
                <h3 id="fileActionsModalTitle">${_chat('file_actions_title')}</h3>
                <p id="fileActionsModalText" style="margin-bottom: 25px;">${_chat('user_actions_text')}</p>
                <div class="modal-buttons vertical">
                    <button id="fileActionDownloadBtn">${_chat('file_actions_download')}</button>
                    <button id="fileActionTestBtn">${_chat('file_actions_test')}</button>
                    <button onclick="ChatModule.closeModal('fileActionsModal')" style="background-color: var(--button-secondary-bg); color: var(--button-secondary-text);">${_chat('modal_cancel_button')}</button>
                </div>
            </div>
        </div>
        `;
        document.body.insertAdjacentHTML('beforeend', chatHTML);
    }
    

    /**
     * Обновляет текстовое содержимое всех элементов чата в соответствии с выбранным языком.
     * Не пересоздает DOM, а только меняет текст.
     */
    function updateChatUIText() {
        // Проверяем, существует ли DOM чата, чтобы избежать ошибок
        if (!document.getElementById('authOverlay')) return;

        // --- Модальное окно авторизации ---
        document.querySelector('#authOverlay h2').textContent = _chat('auth_title');
        document.querySelector('.auth-tab[data-tab="login"]').textContent = _chat('auth_login_tab');
        document.querySelector('.auth-tab[data-tab="register"]').textContent = _chat('auth_register_tab');
        document.getElementById('loginUsername').placeholder = _chat('auth_login_placeholder');
        document.getElementById('loginPassword').placeholder = _chat('auth_password_placeholder');
        document.querySelector('#loginForm button').textContent = _chat('auth_login_button');
        document.getElementById('registerUsername').placeholder = _chat('auth_register_username_placeholder');
        document.getElementById('registerEmail').placeholder = _chat('auth_register_email_placeholder');
        document.getElementById('registerPassword').placeholder = _chat('auth_register_password_placeholder');
        document.getElementById('registerPasswordConfirm').placeholder = _chat('auth_register_confirm_placeholder');
        document.querySelector('#registerForm button').textContent = _chat('auth_register_button');
        document.querySelector('#authOverlay > div > button').textContent = _chat('auth_close_button');

        // --- Основное окно чата ---
        // Шапка
        document.getElementById('chatHeaderTitle').textContent = _chat(TABS[currentTab].langKey);
        document.querySelector('#userDropdown a[onclick*="showProfileModal"]').textContent = _chat('edit_profile_link');
        document.querySelector('#userDropdown a[onclick*="logout"]').textContent = _chat('logout_link');
        document.getElementById('notificationToggle').title = _chat('notifications_title');
        
        // Сайдбар
        document.querySelector('.sidebar-section:nth-of-type(1) h4').textContent = _chat('sidebar_sections');
        document.querySelector('.tab-item[data-tab="messages"] .tab-name').textContent = _chat('tab_messages');
        document.querySelector('.tab-item[data-tab="questions"] .tab-name').textContent = _chat('tab_questions');
        document.querySelector('.tab-item[data-tab="favorites"] .tab-name').textContent = _chat('tab_favorites');
        document.querySelector('.tab-item[data-tab="users"] .tab-name').textContent = _chat('tab_users');
        document.querySelector('.sidebar-section:nth-of-type(2) h4').textContent = _chat('sidebar_channels');
        document.getElementById('createChannelBtn').textContent = _chat('sidebar_create_channel');
        document.getElementById('privateChatsSection').querySelector('h4').textContent = _chat('sidebar_private_messages');
        document.querySelector('.sidebar-section:nth-of-type(4) h4').innerHTML = `${_chat('sidebar_online')} (<span id="onlineCount">${onlineUsers.size}</span>)`;
        
        // Основная область
        document.getElementById('chatSearchInput').placeholder = _chat('search_placeholder');
        document.getElementById('togglePinnedBtn').title = isPinnedMode ? _chat('pinned_mode_on_title') : _chat('pinned_mode_off_title');
        document.querySelector('#replyingToPanel span').textContent = _chat('reply_panel_title');
        document.getElementById('emojiBtn').title = _chat('emoji_button_title');
        document.getElementById('questionBtn').title = _chat('create_question_button_title');
        document.getElementById('uploadFileBtn').title = _chat('attach_file_button_title');
        document.getElementById('chatInput').placeholder = _chat('chat_input_placeholder');

        // --- Другие модальные окна ---
        document.querySelector('#userActionsModal h3').textContent = _chat('user_actions_title');
        document.querySelector('#userActionsModal p').textContent = _chat('user_actions_text');
        document.querySelector('#userActionsChatBtn').textContent = _chat('user_actions_chat_button');
        document.querySelector('#userActionsEmailBtn').textContent = _chat('user_actions_email_button');
        document.querySelector('#userActionsModal button[onclick*="closeModal"]').textContent = _chat('modal_cancel_button');

        document.querySelector('#channelEditModal h3').textContent = _chat('channel_settings_title');
        document.getElementById('editChannelNameInput').placeholder = _chat('channel_edit_name_placeholder');
        document.getElementById('editChannelPasswordInput').placeholder = _chat('channel_edit_password_placeholder');
        document.getElementById('editChannelDescInput').placeholder = _chat('channel_edit_desc_placeholder');
        document.querySelector('#channelMembersSection h4').textContent = _chat('channel_members_title');
        document.querySelector('#channelEditModal button[onclick*="saveChannelEdit"]').textContent = _chat('modal_save_button');
        document.querySelector('#channelEditModal button[onclick*="closeModal"]').textContent = _chat('modal_cancel_button');
        document.getElementById('deleteChannelBtn').textContent = _chat('delete_channel_button');
        
        document.querySelector('#channelCreateModal h3').textContent = _chat('create_channel_title');
        document.getElementById('channelNameInput').placeholder = _chat('channel_create_name_placeholder');
        document.getElementById('channelPasswordInput').placeholder = _chat('channel_create_password_placeholder');
        document.getElementById('channelDescInput').placeholder = _chat('channel_create_desc_placeholder');
        document.querySelector('#channelCreateModal button[onclick*="createChannel"]').textContent = _chat('modal_create_button');
        document.querySelector('#channelCreateModal button[onclick*="closeModal"]').textContent = _chat('modal_cancel_button');

        document.querySelector('#questionCreateModal h3').textContent = _chat('create_question_title');
        document.getElementById('questionTextInput').placeholder = _chat('create_question_placeholder');
        document.querySelector('#questionCreateModal button[onclick*="createQuestion"]').textContent = _chat('create_question_modal_button');
        document.querySelector('#questionCreateModal button[onclick*="closeModal"]').textContent = _chat('modal_cancel_button');

        document.querySelector('#editMessageModal h3').textContent = _chat('edit_message_title');
        document.querySelector('#editMessageModal button[onclick*="saveMessageEdit"]').textContent = _chat('modal_save_button');
        document.querySelector('#editMessageModal button[onclick*="closeModal"]').textContent = _chat('modal_cancel_button');

        document.querySelector('#profileEditModal h3').textContent = _chat('edit_profile_title');
        document.getElementById('profileDisplayName').placeholder = _chat('edit_profile_name_placeholder');
        document.getElementById('profileNewPassword').placeholder = _chat('edit_profile_new_password_placeholder');
        document.querySelector('#profileEditModal button[onclick*="saveProfile"]').textContent = _chat('modal_save_button');
        document.querySelector('#profileEditModal button[onclick*="closeModal"]').textContent = _chat('modal_cancel_button');
        document.getElementById('deleteAccountBtn').textContent = _chat('delete_account_button');

        document.querySelector('#fileActionsModal h3').textContent = _chat('file_actions_title');
        document.querySelector('#fileActionsModal p').textContent = _chat('user_actions_text');
        document.getElementById('fileActionDownloadBtn').textContent = _chat('file_actions_download');
        document.getElementById('fileActionTestBtn').textContent = _chat('file_actions_test');
        document.querySelector('#fileActionsModal button[onclick*="closeModal"]').textContent = _chat('modal_cancel_button');
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
            // Проверяем, что это не вкладка "Пользователи", для которой свой счетчик
            if(tabId !== 'users') {
                 tabCounters[tabId] = document.getElementById(`${tabId}Count`);
            }
        });
        // ПРАВИЛЬНО привязываем счетчики для пользователей
        tabCounters['users'] = document.getElementById('usersCount'); // Счетчик для вкладки
        tabCounters['online'] = document.getElementById('onlineCount'); // Счетчик для секции "Онлайн"
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
                // Отправляем сообщение по Ctrl+Enter
                if (e.key === 'Enter' && e.ctrlKey) {
                    // Предотвращаем создание новой строки, которое может произойти
                    e.preventDefault(); 
                    // Вызываем функцию отправки
                    sendMessage();
                }
                // Если нажат просто Enter (без Ctrl), то ничего не делаем,
                // позволяя браузеру выполнить действие по умолчанию - создать новую строку.
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
        // Внутри функции setupEventListeners() в ChatModule
        document.getElementById('uploadFileBtn')?.addEventListener('click', handleChatFileUploadTrigger);
        document.getElementById('chatFileInput')?.addEventListener('change', handleChatFileSelected);


        // Делегирование клика для переключения видимости пароля
        document.body.addEventListener('click', function(event) {
            // Проверяем, был ли клик именно по нашей иконке
            if (event.target.classList.contains('toggle-password')) {
                const icon = event.target;
                // Находим соседний элемент - наше поле ввода
                const passwordInput = icon.previousElementSibling;

                if (passwordInput && passwordInput.type === 'password') {
                    // Если поле скрыто - показываем
                    passwordInput.type = 'text';
                    icon.textContent = '🙈'; // Меняем иконку на "открытый глаз"
                } else if (passwordInput && passwordInput.type === 'text') {
                    // Если поле видно - скрываем
                    passwordInput.type = 'password';
                    icon.textContent = '👁️'; // Возвращаем иконку "закрытого глаза"
                }
            }
        });









        const debouncedSearch = debounce(handleSearch, 300);
        if (searchInput) searchInput.addEventListener('input', debouncedSearch);

        

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
                
                // ЗАГРУЖАЕМ РАЗБЛОКИРОВАННЫЕ КАНАЛЫ ИЗ ХРАНИЛИЩА
                const savedUnlocked = localStorage.getItem(`unlockedChannels_${user.uid}`);
                if (savedUnlocked) {
                    unlockedChannels = new Set(JSON.parse(savedUnlocked));
                }

                initializeUnreadListeners(); 
                setupPresenceSystem();
                fetchAllUsers();
                loadChannels();
                loadPrivateChats();
                loadTabData(currentTab);
                initializeDataListeners();
            } else {

                console.log('Пользователь не авторизован');
                clearChatData();
                cleanupPresenceSystem();
            }
        });
    }

    let globalMessagesListener = null; // Переменная для нашего нового слушателя
    let allMessagesByChannel = new Map(); // Кэш для сообщений, сгруппированных по каналам


    function processUnreadMessage(change) {
        if (change.type === 'added') {
            const messageData = change.doc.data();
            const messageTimestamp = messageData.createdAt?.toDate();

            if (!messageTimestamp || messageTimestamp < listenerInitializationTime) {
                return; // Игнорируем старые сообщения из первоначальной загрузки
            }

            const isUnread = messageData.authorId !== currentUser.uid && (currentChannel !== messageData.channelId || currentTab !== 'messages' || document.hidden);
            if (isUnread) {
                const isPrivateMessage = !messageData.memberIds.includes('public');
                const isUnlockedPublicChannel = messageData.memberIds.includes('public') && (messageData.channelId === 'general' || unlockedChannels.has(messageData.channelId));

                if (isPrivateMessage || isUnlockedPublicChannel) {
                    updateUnreadCount(messageData.channelId, 1);
                }
            }
        }
    }


    function initializeUnreadListeners() {
        if (pmUnreadListener) pmUnreadListener();
        if (publicUnreadListener) publicUnreadListener();
        if (!currentUser) return;

        listenerInitializationTime = new Date();
        console.log("Запуск двойного слушателя для счетчиков в:", listenerInitializationTime);

        // СЛУШАТЕЛЬ 1: Только для личных сообщений
        pmUnreadListener = db.collection('messages')
            .where('memberIds', 'array-contains', currentUser.uid)
            .orderBy('createdAt', 'desc')
            .limit(10)
            .onSnapshot(snapshot => {
                snapshot.docChanges().forEach(change => processUnreadMessage(change));
            }, error => console.error("Ошибка слушателя ЛС:", error));

        // СЛУШАТЕЛЬ 2: Только для публичных каналов
        publicUnreadListener = db.collection('messages')
            .where('memberIds', 'array-contains', 'public')
            .orderBy('createdAt', 'desc')
            .limit(10)
            .onSnapshot(snapshot => {
                snapshot.docChanges().forEach(change => processUnreadMessage(change));
            }, error => console.error("Ошибка слушателя каналов:", error));
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
            if (openChatAfterAuth) {
                openChatAfterAuth = false; // Опускаем флажок
                ChatModule.openChatModal(); // Открываем чат
            }
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
        const passwordConfirm = document.getElementById('registerPasswordConfirm').value; // <-- Новая строка

        if (!username || !email || !password || !passwordConfirm) { // <-- Изменено
            showError('Заполните все поля'); 
            return; 
        }
        if (password.length < 6) { 
            showError('Пароль должен содержать минимум 6 символов'); 
            return; 
        }
        if (password !== passwordConfirm) { // <-- Новая проверка
            showError('Пароли не совпадают!');
            return;
        }

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

            if (openChatAfterAuth) {
                openChatAfterAuth = false; // Опускаем флажок
                ChatModule.openChatModal(); // Открываем чат
            }

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

        // Если мы переключились на вкладку сообщений, сбрасываем счетчик для ТЕКУЩЕГО канала
        if (tabId === 'messages') {
            updateUnreadCount(currentChannel, 0, true); // <-- СБРАСЫВАЕМ СЧЕТЧИК ЗДЕСЬ
        }

        document.querySelectorAll('.tab-item').forEach(tab => tab.classList.remove('active'));
        document.querySelector(`[data-tab="${tabId}"]`).classList.add('active');
        document.getElementById('chatHeaderTitle').textContent = _chat(TABS[tabId].langKey);
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
        updateTabCounter('users', allUsers.size);
    }

    /**
     * Управляет счетчиками непрочитанных сообщений.
     * @param {string} channelId - ID канала, для которого меняется счетчик.
     * @param {number} change - Изменение (+1, 0 для сброса).
     */
    function updateUnreadCount(channelId, change) {
        const currentCount = unreadCounts.get(channelId) || 0;
        // Если change = 0, сбрасываем счетчик. Иначе - увеличиваем.
        const newCount = change === 0 ? 0 : currentCount + change;
        unreadCounts.set(channelId, newCount);

        // Обновляем UI для конкретного канала
        const channelCounter = document.querySelector(`.channel-item[data-channel-id="${channelId}"] .unread-channel-badge`);
        if (channelCounter) {
            if (newCount > 0) {
                channelCounter.textContent = newCount;
                channelCounter.classList.remove('hidden');
            } else {
                channelCounter.classList.add('hidden');
            }
        }

        // Пересчитываем и обновляем общий счетчик на вкладке "Сообщения"
        let totalUnread = 0;
        unreadCounts.forEach(count => totalUnread += count);
        updateTabCounter('messages', totalUnread);
    }


    function loadMessages() {
        if (!db || !currentUser) return;

        // Отписываемся от старого слушателя сообщений, если он был
        if (messagesListener) {
            messagesListener();
        }

        messageArea.innerHTML = `<div class="empty-state">${_chat('loading_messages')}</div>`;

        // Создаем новый слушатель ТОЛЬКО ДЛЯ ТЕКУЩЕГО КАНАЛА
        messagesListener = db.collection('messages')
            .where('channelId', '==', currentChannel)
            .orderBy('createdAt', 'asc')
            .onSnapshot(snapshot => {
                // Этот код будет получать все изменения (новые, измененные, удаленные)
                // для активного чата и мгновенно их отображать.
                
                allMessages = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                displayMessages(); // Перерисовываем чат с актуальными данными

            }, error => {
                console.error('Ошибка загрузки сообщений:', error);
                messageArea.innerHTML = `<div class="empty-state">${_chat('loading_error')}</div>`;
            });
    }




 
    function updateUnreadCount(channelId, change, isReset = false) {
        const currentCount = unreadCounts.get(channelId) || 0;
        // Если isReset = true, обнуляем счетчик. Иначе - увеличиваем.
        const newCount = isReset ? 0 : currentCount + change;
        unreadCounts.set(channelId, newCount);

        // Обновляем UI для конкретного канала
        const channelCounter = document.querySelector(`.channel-item[data-channel-id="${channelId}"] .unread-channel-badge`);
        if (channelCounter) {
            if (newCount > 0) {
                channelCounter.textContent = newCount;
                channelCounter.classList.remove('hidden');
            } else {
                channelCounter.classList.add('hidden');
            }
        }

        // Пересчитываем и обновляем общий счетчик на вкладке "Сообщения"
        let totalUnread = 0;
        unreadCounts.forEach(count => totalUnread += count);
        updateTabCounter('messages', totalUnread);
    }




    function displayMessages() {
        if (!messageArea) return;
        messageArea.innerHTML = '';
        const messagesToDisplay = isPinnedMode ? allMessages.filter(msg => msg.isPinned) : allMessages;

        if (messagesToDisplay.length === 0) {
            // ...
            return;
        }
        messagesToDisplay.forEach(message => messageArea.appendChild(createMessageElement(message)));
        
        // --- НОВЫЙ КОД ДЛЯ МГНОВЕННОЙ ПРОКРУТКИ ---
        // 1. Временно отключаем плавную анимацию
        messageArea.style.scrollBehavior = 'auto';
        // 2. Мгновенно прокручиваем вниз
        scrollToBottom();
        // 3. С небольшой задержкой возвращаем плавную прокрутку для будущих действий
        setTimeout(() => {
            messageArea.style.scrollBehavior = 'smooth';
        }, 100);
        // --- КОНЕЦ НОВОГО КОДА ---
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
        const timestamp = message.createdAt;

        const displayTime = formatSmartTimestamp(timestamp);

        const fullTimeTitle = timestamp?.toDate()?.toLocaleString(currentChatLang, {
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
        if (message.type === 'file_share') {
            messageEl.classList.add('file-share-bubble');
            const qCount = message.fileInfo.questions;
            const qText = qCount === 1 ? _chat('file_share_question_1') : (qCount >= 2 && qCount <= 4 ? _chat('file_share_question_2_4') : _chat('file_share_question_5_more'));
            
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
            messageEl.classList.add('question-link-bubble');
            contentHTML = `<div class="question-link-content" onclick="ChatModule.navigateToQuestion('${message.questionId}', '${message.id}')"><span class="question-link-icon">❓</span><div class="question-link-text"><strong>${_chat('new_question_notification')}</strong><p>${escapeHTML(message.text.substring(0, 80))}...</p></div><span class="question-link-arrow">→</span></div>`;
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
        
        messageEl.innerHTML = `<div class="message-header"><span class="author">${message.authorName || _chat('anonymous_user')}</span><span class="timestamp" title="${fullTimeTitle}">${displayTime}</span></div>${replyHTML}${contentHTML}${reactionsHTML}<div class="message-actions-toolbar">${actionsHTML}</div>`;
        
        const MAX_HEIGHT = 250; // Высота в пикселях, после которой сообщение сворачивается
        const contentEl = messageEl.querySelector('.message-content');

        // Проверяем, что это текстовое сообщение, и даем браузеру мгновение на расчет высоты
        if (contentEl) {
            // Использование setTimeout(..., 0) - это надежный способ убедиться,
            // что браузер успел отрисовать элемент и правильно рассчитать его scrollHeight.
            setTimeout(() => {
                if (contentEl.scrollHeight > MAX_HEIGHT) {
                    contentEl.classList.add('collapsible');

                    const expandBtn = document.createElement('button');
                    expandBtn.className = 'expand-message-btn';
                    expandBtn.textContent = _chat('expand_message');

                    expandBtn.onclick = function() {
                        const isExpanded = contentEl.classList.toggle('expanded');
                        // Меняем текст кнопки в зависимости от состояния
                        this.textContent = isExpanded ? _chat('collapse_message') : _chat('expand_message');
                    };

                    // Добавляем кнопку после блока с сообщением, внутри основного элемента
                    messageEl.appendChild(expandBtn);
                }
            }, 0); 
        }

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

    // НОВАЯ, НАДЕЖНАЯ ВЕРСИЯ
    function escape(str) {
        if (!str) return '';
        return str
            .replace(/\\/g, '\\\\')  // 1. Сначала экранируем сами слеши
            .replace(/'/g, "\\'")   // 2. Экранируем одинарные кавычки
            .replace(/"/g, '\\"')   // 3. Экранируем двойные кавычки (на всякий случай)
            .replace(/\n/g, '\\n')  // 4. Заменяем переносы строк на их текстовый эквивалент
            .replace(/\r/g, '\\r'); // 5. То же для возврата каретки
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
                <button class="add-to-favorites-btn">${_chat('add_to_favorites_button')}</button>
                <button class="copy-question-btn">${_chat('copy_question_button')}</button> 
            `;

            if (currentUser && question.authorId === currentUser?.uid) {
                actionsHTML += `<button class="delete-question-btn" onclick="ChatModule.deleteQuestion('${question.id}')">${_chat('delete_question_button')}</button>`;
            }

            questionEl.innerHTML = `
                <div style="display: flex; align-items: flex-start; gap: 15px;">
                    <div class="question-square ${totalVotes > 0 ? 'has-votes' : ''}">
                        ${totalVotes > 0 ? `<span class="vote-indicator">${totalVotes}</span>` : ''}Q</div>
                    <div class="question-content">
                        <p><strong>${_chat('question_card_question_label')}</strong> ${escapeHTML(question.text || '')}</p>
                        <p><strong>${_chat('question_card_author_label')}</strong> ${escapeHTML(question.authorName || _chat('question_card_anonymous'))}</p>
                        <p><strong>${_chat('question_card_date_label')}</strong> ${timeStr}</p>
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
            // Проверяем, нужно ли добавлять пользователя в участники
            if (currentChannelType === 'public' && currentChannel !== 'general') {
                // Находим данные текущего канала в нашем локальном кэше (это быстро)
                const channel = channels.find(c => c.id === currentChannel);
                
                // Обновляем список участников, ТОЛЬКО ЕСЛИ пользователь еще не в нем
                if (channel && (!channel.members || !channel.members.includes(currentUser.uid))) {
                    const channelRef = db.collection('channels').doc(currentChannel);
                    await channelRef.update({
                        members: firebase.firestore.FieldValue.arrayUnion(currentUser.uid)
                    });
                }
            }

            if (isQuestionFormat) {
                await createQuestionFromMessage(text);
                chatInput.value = '';
            } else {

                let memberIds = [];
                if (currentChannelType === 'private') {
                    // Для личных чатов ID участников есть в названии канала
                    memberIds = currentChannel.replace('private_', '').split('_');
                } else {
                    // Для ПУБЛИЧНЫХ каналов добавляем специальную метку "public"
                    // Это позволит любому пользователю подписаться на эти сообщения.
                    memberIds = ['public']; 
                }

                const message = {
                    text: text,
                    authorId: currentUser.uid,
                    authorName: currentUser.displayName || currentUser.email || 'Аноним',
                    channelId: currentChannel,
                    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                    type: 'message',
                    reactions: {},
                    memberIds: memberIds // <--- ДОБАВЛЕНО ЭТО ПОЛЕ
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
        if (confirm(_chat('confirm_delete_message'))) {
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
            // ... (код добавления в БД)
            await db.collection('favorites').add(favorite);
            alert('Добавлено в избранное!');


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
        if (pmUnreadListener) pmUnreadListener(); // <-- ДОБАВЛЕНО
        if (publicUnreadListener) publicUnreadListener(); // <-- ДОБАВЛЕНО
        onlineUsers.clear();
        updateOnlineUsersList();
    }



    function updateOnlineUsersList() {
        if (!onlineUsersList) return;
        onlineUsersList.innerHTML = '';
        // Обновляем ТОЛЬКО счетчик онлайн-пользователей
        if (tabCounters['online']) tabCounters['online'].textContent = onlineUsers.size;

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

    function initializeDataListeners() {
        if (!currentUser || !db) return;

        console.log("Запуск постоянных слушателей данных...");

        // Слушатель для вопросов
        db.collection('questions')
          .where('channelId', '==', currentChannel) // Можно оставить для текущего канала
          .onSnapshot(snapshot => {
              updateTabCounter('questions', snapshot.size);
          }, err => console.error("Ошибка слушателя вопросов:", err));

        // Слушатель для избранного (только для текущего пользователя)
        db.collection('favorites')
          .where('userId', '==', currentUser.uid)
          .onSnapshot(snapshot => {
              updateTabCounter('favorites', snapshot.size);
          }, err => console.error("Ошибка слушателя избранного:", err));

        // Слушатели для сообщений и пользователей уже глобальные, их трогать не нужно.
    }

    function renderChannelsList() {
        if(!channelsList) return;
        channelsList.innerHTML = '';
        channels.forEach(channel => {
            const isOwner = channel.createdBy === currentUser.uid;
            const channelEl = document.createElement('div');
            // Добавляем data-атрибут для легкого доступа
            channelEl.dataset.channelId = channel.id; // <-- ДОБАВЛЕНО
            channelEl.className = `channel-item ${channel.id === currentChannel && currentChannelType === 'public' ? 'active' : ''}`;

            const lockIcon = channel.hasPassword ? '🔒 ' : '';
            const settingsIcon = isOwner ? `<button class="channel-settings-btn" onclick="event.stopPropagation(); ChatModule.showChannelEditModal('${channel.id}')">⚙️</button>` : '';
            const unreadCount = unreadCounts.get(channel.id) || 0; // <-- ДОБАВЛЕНО

            // Добавляем HTML для счетчика
            channelEl.innerHTML = `
                <span class="channel-name">${lockIcon}# ${escapeHTML(channel.name)}</span>
                <span class="unread-channel-badge ${unreadCount > 0 ? '' : 'hidden'}">${unreadCount}</span>
                ${settingsIcon}
            `; // <-- ИЗМЕНЕНО

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
            
            chatEl.dataset.channelId = channelId; // <--- ДОБАВЛЕНО: Присваиваем ID для поиска счетчика

            chatEl.className = `channel-item ${channelId === currentChannel && currentChannelType === 'private' ? 'active' : ''}`;
            const isOnline = onlineUsers.has(chatPartner.uid);
            const unreadCount = unreadCounts.get(channelId) || 0; // <--- ДОБАВЛЕНО: Получаем текущий счетчик

            // ИЗМЕНЕНО: Добавляем HTML-элемент для счетчика
            chatEl.innerHTML = `
                <span class="status-indicator ${isOnline ? 'online' : ''}" style="margin-right: 8px;"></span>
                <span class="channel-name">${escapeHTML(chatPartner.username)}</span>
                <span class="unread-channel-badge ${unreadCount > 0 ? '' : 'hidden'}">${unreadCount}</span>
            `;

            chatEl.addEventListener('click', () => switchToChannel(channelId, chatPartner.username, 'private'));
            privateChatsList.appendChild(chatEl);
        });
    }
   
 
    function switchToChannel(channelId, channelName, type = 'public') {
        // Действие №1: Всегда обнуляем счетчик для канала, на который кликнули.
        // Это гарантирует, что счетчик исчезнет немедленно.
        updateUnreadCount(channelId, 0, true);

        // Действие №2: Обновляем заголовок с названием канала
        const channelNameEl = document.getElementById('currentChannelName');
        if (channelNameEl) {
            const prefix = type === 'public' ? '# ' : '@ ';
            channelNameEl.textContent = `${prefix}${channelName}`;
        }

        // Действие №3: Проверяем, нужно ли нам полностью менять контекст
        if (currentChannel !== channelId) {
            // Если мы переключаемся на ДРУГОЙ канал:
            currentChannel = channelId;
            currentChannelType = type;
            // Загружаем сообщения для нового канала
            loadMessages();
        }

        // Действие №4: В любом случае, переключаемся на вкладку "Сообщения"
        // и обновляем визуальное состояние боковой панели.
        // Функция switchTab сама позаботится о том, чтобы не делать лишней работы.
        switchTab('messages');
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
        return hashHex;
    }

    async function handleChannelClick(channel) {
        // Если канал защищен и еще не разблокирован, запрашиваем пароль
        if (channel.hasPassword && !unlockedChannels.has(channel.id)) {
            const password = prompt(`${_chat('channel_enter_password_prompt', { channelName: channel.name })}`);
            if (password === null) return; // Пользователь нажал "Отмена"

            const enteredPasswordHash = await hashPassword(password);

            if (enteredPasswordHash === channel.passwordHash) {
                unlockedChannels.add(channel.id);
                // СОХРАНЯЕМ ОБНОВЛЕННЫЙ СПИСОК В ХРАНИЛИЩЕ
                localStorage.setItem(`unlockedChannels_${currentUser.uid}`, JSON.stringify(Array.from(unlockedChannels)));

                // Если пароль верный, продолжаем переключение
                switchToChannel(channel.id, channel.name, 'public');
            } else {

                alert(_chat('invalid_channel_password'));
            }
        } else {
            // Если канал публичный или уже разблокирован, просто переключаемся
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
    



    // ЗАМЕНИТЕ ВСЮ СТАРУЮ ФУНКЦИЮ НА ЭТОТ КОД
    function showEmojiPicker() {
        const emojiBtn = document.getElementById('emojiBtn');
        if (!emojiBtn) return;

        if (!customElements.get('emoji-picker')) {
            console.warn('Emoji picker не загружен');
            return;
        }

        // --- НАЧАЛО НОВОЙ, НАДЕЖНОЙ ЛОГИКИ ---

        const existingPicker = document.querySelector('emoji-picker.main-input-picker');
        // 1. Если пикер уже открыт, мы его просто удаляем и выходим.
        // Это обеспечивает поведение "включить/выключить".
        if (existingPicker) {
            existingPicker.remove();
            return;
        }

        // 2. Создаем НОВЫЙ элемент пикера КАЖДЫЙ раз при открытии.
        const picker = document.createElement('emoji-picker');
        // Добавляем класс, чтобы легко его находить
        picker.classList.add('main-input-picker'); 

        picker.addEventListener('emoji-click', event => {
            insertEmoji(event.detail.unicode);
            // После выбора смайлика пикер можно сразу закрыть
            if (picker.parentNode) {
                picker.remove();
            }
        });

        // 3. Используем вашу проверенную логику позиционирования
        document.body.appendChild(picker);
        picker.style.visibility = 'hidden';
        picker.style.position = 'fixed';
        picker.style.left = '-9999px';
        picker.style.top = '-9999px';

        const pickerRect = picker.getBoundingClientRect();
        const btnRect = emojiBtn.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const margin = 10;

        let leftPos = btnRect.left + (btnRect.width / 2) - (pickerRect.width / 2);
        if (leftPos < margin) leftPos = margin;
        if (leftPos + pickerRect.width > viewportWidth - margin) {
            leftPos = viewportWidth - pickerRect.width - margin;
        }

        let topPos = btnRect.top - pickerRect.height - margin;
        if (topPos < margin) {
            topPos = btnRect.bottom + margin;
        }

        picker.style.top = `${topPos}px`;
        picker.style.left = `${leftPos}px`;
        
        if (document.body.classList.contains('dark-mode')) {
            picker.classList.add('dark');
        } else {
            picker.classList.add('light');
        }

        picker.style.visibility = 'visible';
        picker.classList.add('visible');

        // 4. Добавляем слушатель, который будет УДАЛЯТЬ пикер при клике снаружи.
        const closeOnClickOutside = (e) => {
            // Проверяем, что пикер все еще существует и клик был не по нему и не по кнопке
            if (document.body.contains(picker) && !picker.contains(e.target) && !emojiBtn.contains(e.target)) {
                picker.remove(); // <-- САМОЕ ГЛАВНОЕ: ПОЛНОЕ УДАЛЕНИЕ
                // После удаления обязательно убираем сам слушатель, чтобы он не "висел" в памяти
                window.removeEventListener('click', closeOnClickOutside);
            }
        };
        
        // Устанавливаем слушатель
        setTimeout(() => {
            window.addEventListener('click', closeOnClickOutside);
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
    


    
    
    function clearChatData() {
        // ОЧИЩАЕМ ХРАНИЛИЩЕ ПРИ ВЫХОДЕ
        if (currentUser) {
            localStorage.removeItem(`unlockedChannels_${currentUser.uid}`);
        }

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



    // --- НАЧАЛО НОВОГО КОДА: Функционал файлов в чате ---

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
            closeModal('fileActionsModal');
            const url = `${googleAppScriptUrl}?action=getChatFileContent&fileId=${fileId}`;
            const response = await fetch(url);
            const data = await response.json();
            if (!data.success) throw new Error(data.error);

            await window.mainApp.downloadOrShareFile(fileName, data.content, 'text/plain;charset=utf-8', `Файл`);
        } catch (error) {
            console.error('Ошибка скачивания файла из чата:', error);
            alert(`Не удалось скачать файл: ${error.message}`);
        }
    }



    async function startTestFromShare(fileId, fileName) {
         try {
            closeModal('fileActionsModal');
            ChatModule.closeChatModal(); // Закрываем чат

            // ИСПРАВЛЕНИЕ: Вызываем функцию через объект mainApp
            window.mainApp.showGlobalLoader(`Загрузка теста "${fileName}"...`);

            const url = `${googleAppScriptUrl}?action=getChatFileContent&fileId=${fileId}`;
            const response = await fetch(url);
            const data = await response.json();
            if (!data.success) throw new Error(data.error);
            
            // Эта функция сама скроет лоадер, когда будет готова
            window.mainApp.processFile(fileName, data.content);

        } catch (error) {
            console.error('Ошибка запуска теста из чата:', error);

            // ИСПРАВЛЕНИЕ: Вызываем функцию через объект mainApp
            window.mainApp.hideGlobalLoader();
            
            alert(`Не удалось запустить тест: ${error.message}`);
        }
    }

    // --- КОНЕЦ НОВОГО КОДА ---



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
            downloadQstBtn.textContent = _chat('download_qst_button'); // ИЗМЕНЕНО
            downloadQstBtn.onclick = () => handleDownload(tabId, 'qst');
            container.appendChild(downloadQstBtn);
    
            const downloadTxtBtn = document.createElement('button');
            downloadTxtBtn.textContent = _chat('download_txt_button'); // ИЗМЕНЕНО
            downloadTxtBtn.onclick = () => handleDownload(tabId, 'txt');
            container.appendChild(downloadTxtBtn);
        }
    
        if (tabId === 'favorites') {
            const clearBtn = document.createElement('button');
            clearBtn.textContent = _chat('clear_favorites_button'); // ИЗМЕНЕНО
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
            
            // Если пользователь не авторизован, показываем окно входа
            if (!currentUser) {
                openChatAfterAuth = true;
                ChatModule.openAuthModal();
                return;
            }
            
            // Просто показываем чат. Текст в нем уже будет на правильном языке.
            chatOverlay.classList.remove('hidden');

            // Ключевое исправление: Загружаем данные для текущей вкладки КАЖДЫЙ РАЗ при открытии.
            // Это гарантирует, что сообщения отобразятся, даже если они загрузились в фоне.
            loadTabData(currentTab); 
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
        
        // === НАЧАЛО НОВОГО МЕТОДА ===
        /**
         * Устанавливает язык для модуля чата и немедленно обновляет его UI,
         * даже если он скрыт.
         * @param {string} lang - Код языка ('ru' или 'en').
         */
        setLanguage: (lang) => {
            if (LANG_PACK_CHAT[lang]) {
                currentChatLang = lang;
                localStorage.setItem('chatLanguage', lang);

                // Ключевой момент: Мы обновляем текст в DOM в любом случае.
                // Элементы существуют, просто они невидимы.
                // Внутри updateChatUIText() уже есть проверка на случай, если DOM еще не создан.
                updateChatUIText();
            }
        },
        // === КОНЕЦ НОВОГО МЕТОДА ===




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
            // Главный экран
            continue_later_button: 'Продолжить позже',
            continue_sessions: 'Продолжить:',
            answered_of: 'Отвечено',
            from: 'из',
            time_left: 'Осталось времени',
            continue_quiz_button: 'Продолжить',
            delete_session_button: 'Удалить',
            search_in_db: 'Поиск вопроса в базе:',
            search_placeholder: 'Введите часть текста вопроса...',
            find_button: 'Найти',
            searching_in_db: 'Идет поиск по базе...',
            or_divider: '-- или --',
            choose_file: 'Выберите .qst либо .txt файл с устройства:',
            gradus_button_main: 'GRADUS',
            gradus_subtitle: '(General Repository for Academic Data, Utility & Structure)',
            parser_button_main: 'Перевести',
            parser_subtitle: 'текст в формат .qst',
            recent_files: 'Недавно использованные:',
            // Навигация и заголовки
            nav_gradus: 'Навигация по GRADUS',
            back_to_main: 'Назад к главному экрану',
            search_results_title: 'Результаты поиска',
            back_to_search: 'Новый поиск',
            quiz_settings_title: 'Настройки теста',
            cheat_sheet_title: 'Сгенерированная шпора:',
            quiz_finished_title: 'Тест завершен!',
            parser_title: 'Конвертер в .qst',
            parser_description: 'Загрузите файл или вставьте текст для преобразования в формат теста.',
            // Настройки теста
            time_limit: 'Лимит времени (минуты, 0 - без лимита):',
            time_limit_minutes: 'мин',
            question_range: 'Диапазон вопросов:',
            range_from: 'От',
            range_to: 'До',
            total_questions_label: 'всего',
            questions_label_for_range: 'вопросов',
            shuffle_questions: 'Перемешать вопросы',
            shuffle_answers: 'Перемешать ответы',
            feedback_mode: 'Режим обратной связи (сохранить ошибки)',
            reading_mode: 'Режим чтения (первый вариант верный)',
            start_quiz_button: 'Начать тест',
            generate_cheat_sheet_button: 'Создать шпору',
            choose_another_file_button: 'Выбрать другой файл',
            // Шпаргалка
            download_cheat_sheet_button: 'Скачать шпору (.txt)',
            back_to_settings_button: 'Назад к настройкам',
            // Экран теста
            timer_label: 'Время:',
            prev_question_button: 'Предыдущий',
            next_question_button: 'Следующий',
            finish_button: 'Завершить тест',
            question_label: 'Вопрос:',
            correct_label: 'Правильно:',
            quick_nav_title: 'Навигация по вопросам:',
            finish_early_button: 'Завершить тест',
            // Результаты
            your_result: 'Ваш результат:',
            of_label: 'из',
            accuracy_label: 'Точность:',
            download_errors_button: 'Скачать неотвеченные/неправильные вопросы',
            review_errors_button: 'Работа над ошибками',
            download_triggered_quiz_button: 'Скачать тест с триггерами',
            restart_button: 'Пройти другой тест',
            // Парсер
            parser_upload_or_paste: '1. Загрузите файл (.txt) или вставьте текст ниже:',
            clear_parser_input: 'Очистить поле',
            parser_input_placeholder: 'Или вставьте сюда текст из вашего документа...',
            parser_select_format: '2. Выберите формат (или оставьте для автоопределения):',
            parser_auto_detect: '-- Автоматическое определение --',
            parser_run_button: '3. Конвертировать',
            parser_errors_found: '⚠️ Ошибки форматирования',
            parser_result_title: 'Результат:',
            download_parsed_button: 'Скачать .qst файл',
            back_button: 'Назад',
            // Кнопки в шапке (ДОБАВЛЕНО для единообразия)
            copy_question_title: 'Копировать текущий вопрос',
            search_web_title: 'Найти в интернете',
            chat_button_title: 'Открыть чат',
            quick_mode_title: 'Быстрый режим (Автопереход)',
            trigger_words_title: 'Триггер-слова',
            theme_button_title: 'Сменить тему',
            language_toggle_title: 'Сменить язык',
            favorite_button_title: 'Добавить в избранное',
            // Сообщения (ДОБАВЛЕНО)
            search_query_too_short: 'Поисковый запрос должен содержать минимум 3 символа.',
            file_empty_or_invalid_part1: 'Файл "',
            file_empty_or_invalid_part2: '" пуст или имеет неверный формат.',
            no_questions_for_settings: 'Нет вопросов для теста с текущими настройками.',
            confirm_finish_early: 'Вы уверены, что хотите завершить тест досрочно?',
            copy_button: "Копировать",
        },
        kz: {
            // Main Screen
            continue_later_button: 'Кейінірек жалғастыру',
            continue_sessions: 'Жалғастыру:',
            answered_of: 'Жауап берілді:',
            from: ', жалпы:',
            time_left: 'Қалған уақыт',
            continue_quiz_button: 'Жалғастыру',
            delete_session_button: 'Жою',
            search_in_db: 'Дерекқордан сұрақты іздеу:',
            search_placeholder: 'Сұрақ мәтінінің бөлігін енгізіңіз...',
            find_button: 'Іздеу',
            searching_in_db: 'Дерекқордан іздеу жүріп жатыр...',
            or_divider: '-- немесе --',
            choose_file: 'Құрылғыдан .qst немесе .txt файлын таңдаңыз:',
            gradus_button_main: 'GRADUS',
            gradus_subtitle: '(General Repository for Academic Data, Utility & Structure)',
            parser_button_main: 'Мәтінді',
            parser_subtitle: '.qst пішіміне аудару',
            recent_files: 'Жақында пайдаланылғандар:',
            // Navigation & Headers
            nav_gradus: 'GRADUS бойынша навигация',
            back_to_main: 'Басты экранға оралу',
            search_results_title: 'Іздеу нәтижелері',
            back_to_search: 'Жаңа іздеу',
            quiz_settings_title: 'Тест баптаулары',
            cheat_sheet_title: 'Дайындалған шпаргалка:',
            quiz_finished_title: 'Тест аяқталды!',
            parser_title: '.qst форматына түрлендіргіш',
            parser_description: 'Тест пішіміне түрлендіру үшін файлды жүктеңіз немесе мәтінді қойыңыз.',
            // Quiz Settings
            time_limit: 'Уақыт шектеуі (минут, 0 - шектеусіз):',
            time_limit_minutes: 'мин',
            question_range: 'Сұрақтар ауқымы:',
            range_from: 'Бастап',
            range_to: 'Дейін',
            total_questions_label: 'барлығы',
            questions_label_for_range: 'сұрақ',
            shuffle_questions: 'Сұрақтарды араластыру',
            shuffle_answers: 'Жауаптарды араластыру',
            feedback_mode: 'Кері байланыс режимі (қателерді сақтау)',
            reading_mode: 'Оқу режимі (бірінші жауап дұрыс)',
            start_quiz_button: 'Тестті бастау',
            generate_cheat_sheet_button: 'Шпаргалка жасау',
            choose_another_file_button: 'Басқа файл таңдау',
            // Cheat Sheet
            download_cheat_sheet_button: 'Шпаргалканы жүктеу (.txt)',
            back_to_settings_button: 'Баптауларға оралу',
            // Quiz Screen
            timer_label: 'Уақыт:',
            prev_question_button: 'Алдыңғы',
            next_question_button: 'Келесі',
            finish_button: 'Тестті аяқтау',
            question_label: 'Сұрақ:',
            correct_label: 'Дұрыс:',
            quick_nav_title: 'Сұрақтар бойынша жылдам өту:',
            finish_early_button: 'Тестті аяқтау',
            // Results
            your_result: 'Сіздің нәтижеңіз:',
            of_label: 'ішінен',
            accuracy_label: 'Дәлдік:',
            download_errors_button: 'Жауап берілмеген/қате сұрақтарды жүктеу',
            review_errors_button: 'Қателермен жұмыс',
            download_triggered_quiz_button: 'Триггерлері бар тестті жүктеу',
            restart_button: 'Басқа тест өту',
            // Parser
            parser_upload_or_paste: '1. Файлды (.txt) жүктеңіз немесе мәтінді төменге қойыңыз:',
            clear_parser_input: 'Өрісті тазарту',
            parser_input_placeholder: 'Немесе құжаттағы мәтінді осында қойыңыз...',
            parser_select_format: '2. Пішімді таңдаңыз (немесе автоанықтау үшін қалдырыңыз):',
            parser_auto_detect: '-- Автоматты түрде анықтау --',
            parser_run_button: '3. Түрлендіру',
            parser_errors_found: '⚠️ Пішімдеу қателері',
            parser_result_title: 'Нәтиже:',
            download_parsed_button: '.qst файлын жүктеу',
            back_button: 'Артқа',
            // Header Buttons
            copy_question_title: 'Ағымдағы сұрақты көшіру',
            search_web_title: 'Интернеттен іздеу',
            chat_button_title: 'Чатты ашу',
            quick_mode_title: 'Жылдам режим (Автоматты өту)',
            trigger_words_title: 'Триггер-сөздер',
            theme_button_title: 'Тақырыпты өзгерту',
            language_toggle_title: 'Тілді өзгерту',
            favorite_button_title: 'Таңдаулыларға қосу',
            // Messages
            search_query_too_short: 'Іздеу сұранысы кемінде 3 таңбадан тұруы керек.',
            file_empty_or_invalid_part1: '"',
            file_empty_or_invalid_part2: '" файлы бос немесе пішімі жарамсыз.',
            no_questions_for_settings: 'Ағымдағы баптаулар үшін сұрақтар табылмады.',
            confirm_finish_early: 'Тестті мерзімінен бұрын аяқтағыңыз келетініне сенімдісіз бе?',
            copy_button: "Көшіру",
        },
        en: {
            // Main Screen
            continue_later_button: 'Continue Later',
            continue_sessions: 'Continue:',
            answered_of: 'Answered',
            from: 'of',
            time_left: 'Time left',
            continue_quiz_button: 'Continue',
            delete_session_button: 'Delete',
            search_in_db: 'Search question in database:',
            search_placeholder: 'Enter part of the question text...',
            find_button: 'Search',
            searching_in_db: 'Searching database...',
            or_divider: '-- or --',
            choose_file: 'Select a .qst or .txt file from your device:',
            gradus_button_main: 'GRADUS',
            gradus_subtitle: '(General Repository for Academic Data, Utility & Structure)',
            parser_button_main: 'Convert',
            parser_subtitle: 'text to .qst format',
            recent_files: 'Recently used:',
            // Navigation & Headers
            nav_gradus: 'GRADUS Navigation',
            back_to_main: 'Back to Main Screen',
            search_results_title: 'Search Results',
            back_to_search: 'New Search',
            quiz_settings_title: 'Quiz Settings',
            cheat_sheet_title: 'Generated Cheat Sheet:',
            quiz_finished_title: 'Quiz Finished!',
            parser_title: 'Converter to .qst',
            parser_description: 'Upload a file or paste text to convert into a quiz format.',
            // Quiz Settings
            time_limit: 'Time limit (minutes, 0 - no limit):',
            time_limit_minutes: 'min',
            question_range: 'Question Range:',
            range_from: 'From',
            range_to: 'To',
            total_questions_label: 'total',
            questions_label_for_range: 'questions',
            shuffle_questions: 'Shuffle questions',
            shuffle_answers: 'Shuffle answers',
            feedback_mode: 'Feedback mode (save mistakes)',
            reading_mode: 'Reading mode (first option is correct)',
            start_quiz_button: 'Start Quiz',
            generate_cheat_sheet_button: 'Generate Cheat Sheet',
            choose_another_file_button: 'Choose Another File',
            // Cheat Sheet
            download_cheat_sheet_button: 'Download Cheat Sheet (.txt)',
            back_to_settings_button: 'Back to Settings',
            // Quiz Screen
            timer_label: 'Time:',
            prev_question_button: 'Previous',
            next_question_button: 'Next',
            finish_button: 'Finish Quiz',
            question_label: 'Question:',
            correct_label: 'Correct:',
            quick_nav_title: 'Quick Navigation:',
            finish_early_button: 'Finish Quiz',
            // Results
            your_result: 'Your result:',
            of_label: 'of',
            accuracy_label: 'Accuracy:',
            download_errors_button: 'Download unanswered/incorrect questions',
            review_errors_button: 'Review Mistakes',
            download_triggered_quiz_button: 'Download Quiz with Triggers',
            restart_button: 'Take Another Quiz',
            // Parser
            parser_upload_or_paste: '1. Upload a file (.txt) or paste text below:',
            clear_parser_input: 'Clear input',
            parser_input_placeholder: 'Or paste text from your document here...',
            parser_select_format: '2. Select format (or leave for auto-detection):',
            parser_auto_detect: '-- Automatic detection --',
            parser_run_button: '3. Convert',
            parser_errors_found: '⚠️ Formatting errors',
            parser_result_title: 'Result:',
            download_parsed_button: 'Download .qst file',
            back_button: 'Back',
            // Header Buttons (ПОЛНОСТЬЮ ПЕРЕВЕДЕНО)
            copy_question_title: 'Copy current question',
            search_web_title: 'Search the web',
            chat_button_title: 'Open Chat',
            quick_mode_title: 'Quick Mode (Auto-advance)',
            trigger_words_title: 'Trigger Words',
            theme_button_title: 'Change Theme',
            language_toggle_title: 'Change Language',
            favorite_button_title: 'Add to Favorites',
            // Messages (ПОЛНОСТЬЮ ПЕРЕВЕДЕНО)
            search_query_too_short: 'Search query must contain at least 3 characters.',
            file_empty_or_invalid_part1: 'File "',
            file_empty_or_invalid_part2: '" is empty or has an invalid format.',
            no_questions_for_settings: 'No questions found for the current settings.',
            confirm_finish_early: 'Are you sure you want to finish the quiz early?',
            copy_button: "Copy",
        }


    };



    function _(key) {
        const currentLang = localStorage.getItem('appLanguage') || 'ru';
        return LANG_PACK[currentLang][key] || key;
    }

    const getEl = (id) => document.getElementById(id);


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


    // --- ИЗМЕНЕНИЕ: Объявляем переменные здесь, но не присваиваем значения ---
    let fileInput, fileUploadArea, quizSetupArea, quizArea, resultsArea,
        questionTextEl, answerOptionsEl, feedbackAreaEl, prevQuestionButton,
        nextButton, restartButton, startQuizButton, currentQuestionNumEl,
        totalQuestionsNumEl, correctAnswersCountEl, finalCorrectEl, finalTotalEl,
        finalPercentageEl, timeLimitInput, timeLimitValueDisplay,
        questionRangeStartInput, questionRangeEndInput, maxQuestionsInfoEl,
        shuffleQuestionsCheckbox, shuffleAnswersCheckbox, feedbackModeCheckbox,
        timerDisplayEl, timeLeftEl, quickNavPanel, quickNavButtonsContainer,
        feedbackDownloadArea, downloadErrorsButton, themeToggleButton,
        quickModeToggle, triggerWordToggle, recentFilesArea, recentFilesListEl,
        errorReviewArea, reviewErrorsButton, generateCheatSheetButton,
        cheatSheetResultArea, cheatSheetOutputEl, downloadCheatSheetButton,
        backToSettingsButton, chooseAnotherFileButton, finishTestButton,
        triggeredQuizDownloadArea, downloadTriggeredQuizButton, gradusButton,
        gradusFoldersContainer, gradusFolderList, backToFileUploadButton,
        gradusBreadcrumbs, searchContainer, searchQueryInput, searchButton,
        searchResultsContainer, backToSearchButton, webSearchDropdown,
        searchWebButton, searchDropdownContent, chatToggleBtn, languageToggle,
        copyQuestionBtnQuiz, parserArea, parserButton, backToMainFromParserBtn,
        parserFileInput, parserInput, parserPatternSelect, runParserBtn,
        parserOutputArea, parserOutput, downloadParsedBtn, clearParserInputBtn,
        filterVariantsBtn, filterVariantsDropdown, filterVariantCheckboxes,
        applyVariantFilterBtn, resetVariantFilterBtn, searchNavigation,
        prevResultBtn, nextResultBtn, resultCounterEl, readingModeCheckbox, 
        searchResultCardsContainer, continueLaterButton, savedSessionArea, 
        savedSessionList;


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
    const SAVED_SESSIONS_STORAGE_KEY = 'savedQuizSessions'; 
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

    function initializeApp() {
        // --- ИЗМЕНЕНИЕ: Присваиваем значения переменным здесь ---
        
        
        fileInput = getEl('fileInput');
        fileUploadArea = getEl('fileUploadArea');
        quizSetupArea = getEl('quizSetupArea');
        quizArea = getEl('quizArea');
        resultsArea = getEl('resultsArea');
        questionTextEl = getEl('questionText');
        answerOptionsEl = getEl('answerOptions');
        feedbackAreaEl = getEl('feedbackArea');
        prevQuestionButton = getEl('prevQuestionButton');
        nextButton = getEl('nextButton');
        restartButton = getEl('restartButton');
        startQuizButton = getEl('startQuizButton');
        currentQuestionNumEl = getEl('currentQuestionNum');
        totalQuestionsNumEl = getEl('totalQuestionsNum');
        correctAnswersCountEl = getEl('correctAnswersCount');
        finalCorrectEl = getEl('finalCorrect');
        finalTotalEl = getEl('finalTotal');
        finalPercentageEl = getEl('finalPercentage');
        timeLimitInput = getEl('timeLimit');
        timeLimitValueDisplay = getEl('timeLimitValue');
        questionRangeStartInput = getEl('questionRangeStart');
        questionRangeEndInput = getEl('questionRangeEnd');
        maxQuestionsInfoEl = getEl('maxQuestionsInfo');
        shuffleQuestionsCheckbox = getEl('shuffleQuestions');
        shuffleAnswersCheckbox = getEl('shuffleAnswers');
        feedbackModeCheckbox = getEl('feedbackMode');
        readingModeCheckbox = getEl('readingMode');
        timerDisplayEl = getEl('timerDisplay');
        timeLeftEl = getEl('timeLeft');
        quickNavPanel = getEl('quickNavPanel');
        quickNavButtonsContainer = getEl('quickNavButtons');
        feedbackDownloadArea = getEl('feedbackDownloadArea');
        downloadErrorsButton = getEl('downloadErrorsButton');
        themeToggleButton = getEl('themeToggle');
        quickModeToggle = getEl('quickModeToggle');
        triggerWordToggle = getEl('triggerWordToggle');
        recentFilesArea = getEl('recentFilesArea');
        recentFilesListEl = getEl('recentFilesList');
        errorReviewArea = getEl('errorReviewArea');
        reviewErrorsButton = getEl('reviewErrorsButton');
        generateCheatSheetButton = getEl('generateCheatSheetButton');
        cheatSheetResultArea = getEl('cheatSheetResultArea');
        cheatSheetOutputEl = getEl('cheatSheetOutput');
        downloadCheatSheetButton = getEl('downloadCheatSheetButton');
        backToSettingsButton = getEl('backToSettingsButton');
        chooseAnotherFileButton = getEl('chooseAnotherFileButton');
        finishTestButton = getEl('finishTestButton');
        triggeredQuizDownloadArea = getEl('triggeredQuizDownloadArea');
        downloadTriggeredQuizButton = getEl('downloadTriggeredQuizButton');
        gradusButton = getEl('gradusButton');
        gradusFoldersContainer = getEl('gradusFoldersContainer');
        gradusFolderList = getEl('gradusFolderList');
        backToFileUploadButton = getEl('backToFileUploadButton');
        gradusBreadcrumbs = getEl('gradusBreadcrumbs');
        searchContainer = getEl('searchContainer');
        searchQueryInput = getEl('searchQueryInput');
        searchButton = getEl('searchButton');
        searchResultsContainer = getEl('searchResultsContainer');
        backToSearchButton = getEl('backToSearchButton');
        webSearchDropdown = getEl('webSearchDropdown');
        searchWebButton = getEl('searchWebButton');
        searchDropdownContent = getEl('searchDropdownContent');
        chatToggleBtn = getEl('chatToggle');
        languageToggle = getEl('languageToggle');
        copyQuestionBtnQuiz = getEl('copyQuestionBtnQuiz');
        parserArea = getEl('parserArea');
        parserButton = getEl('parserButton');
        backToMainFromParserBtn = getEl('backToMainFromParserBtn');
        parserFileInput = getEl('parserFileInput');
        parserInput = getEl('parserInput');
        parserPatternSelect = getEl('parserPatternSelect');
        runParserBtn = getEl('runParserBtn');
        parserOutputArea = getEl('parserOutputArea');
        parserOutput = getEl('parserOutput');
        downloadParsedBtn = getEl('downloadParsedBtn');
        clearParserInputBtn = getEl('clearParserInputBtn');
        filterVariantsBtn = getEl('filterVariantsBtn');
        filterVariantsDropdown = getEl('filterVariantsDropdown');
        filterVariantCheckboxes = getEl('filterVariantCheckboxes');
        applyVariantFilterBtn = getEl('applyVariantFilterBtn');
        resetVariantFilterBtn = getEl('resetVariantFilterBtn');
        searchNavigation = getEl('searchNavigation');
        prevResultBtn = getEl('prevResultBtn');
        nextResultBtn = getEl('nextResultBtn');
        resultCounterEl = getEl('resultCounter');
        searchResultCardsContainer = getEl('searchResultCards');
        continueLaterButton = getEl('continueLaterButton');
        savedSessionArea = getEl('savedSessionArea');
        savedSessionList = getEl('savedSessionList');

        // Остальная часть функции initializeApp
        try {
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
            ChatModule.init(null, null);
        }
        
        setupEventListeners();
        loadTheme();
        updateQuickModeToggleVisual();
        updateTriggerWordToggleVisual();
        loadRecentFiles();
        loadSavedSession();
        const savedLang = localStorage.getItem('appLanguage') || 'ru';
        populateParserPatterns();
        setLanguage(savedLang);
        createVariantFilterCheckboxes();
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

        // Внутри функции setupEventListeners()
        parserButton?.addEventListener('click', () => {
            fileUploadArea.classList.add('hidden');
            parserArea.classList.remove('hidden');
        });

        backToMainFromParserBtn?.addEventListener('click', () => {
            parserArea.classList.add('hidden');
            fileUploadArea.classList.remove('hidden');
        });

        parserFileInput?.addEventListener('change', handleParserFileInput);
        runParserBtn?.addEventListener('click', runParser);
        downloadParsedBtn?.addEventListener('click', downloadParsedQst);
        clearParserInputBtn?.addEventListener('click', clearParserInput);


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
        continueLaterButton?.addEventListener('click', saveSessionForLater);
        finishTestButton?.addEventListener('click', () => {
            if (confirm(_('confirm_finish_early'))) {
                if (timerInterval) clearInterval(timerInterval);
                showResults();
            }
        });

        quickModeToggle?.addEventListener('click', toggleQuickMode);
        triggerWordToggle?.addEventListener('click', toggleTriggerWordMode);
        downloadTriggeredQuizButton?.addEventListener('click', downloadTriggeredQuizFile);
        readingModeCheckbox?.addEventListener('change', handleReadingModeChange);
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

        // Новые обработчики для фильтра
        filterVariantsBtn?.addEventListener('click', (event) => {
            event.stopPropagation(); // Предотвращаем закрытие по клику на саму кнопку
            filterVariantsDropdown.classList.toggle('hidden');
        });

        applyVariantFilterBtn?.addEventListener('click', filterByVariantCount);
        resetVariantFilterBtn?.addEventListener('click', resetVariantFilter);
        
        // Закрываем выпадающее меню при клике вне его
        window.addEventListener('click', (event) => {
            if (filterVariantsDropdown && !filterVariantsDropdown.classList.contains('hidden')) {
                if (!filterVariantsDropdown.contains(event.target) && event.target !== filterVariantsBtn) {
                    filterVariantsDropdown.classList.add('hidden');
                }
            }
        });



    }


    function showGlobalLoader(message = 'Загрузка...') {
        // Проверяем, есть ли уже лоадер, чтобы не создавать дубликаты
        if (document.getElementById('globalLoader')) return;

        const loaderHTML = `
            <div id="globalLoader" class="global-loader-overlay">
                <div class="loader-content">
                    <div class="loader-spinner"></div>
                    <p>${escapeHTML(message)}</p>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', loaderHTML);
    }

    function hideGlobalLoader() {
        const loader = document.getElementById('globalLoader');
        if (loader) {
            loader.remove();
        }
    }



    async function performSearch() {
        const query = searchQueryInput.value.trim();
        if (query.length < 3) {
            alert(_('search_query_too_short'));
            return;
        }

        fileUploadArea.classList.add('hidden');
        searchResultsContainer.classList.remove('hidden');
        
        // Эта строка теперь будет работать правильно
        searchResultCardsContainer.innerHTML = `
            <div class="loading-placeholder">
            <div class="loading-spinner"></div>
            <span>${_('searching_in_db')}</span>
            </div>
        `;
        // Добавьте в LANG_PACK: searching_in_db: 'Идет поиск по базе...' / 'Searching database...'

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
                    alert(`${_('file_empty_or_invalid_part1')}"${data.fileName}" ${_('file_empty_or_invalid_part2')}`);
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



    async function createTemporaryDownloadLink(fileName, content, contentType, shareDialogTitlePrefix) {
        try {
            console.log('Создаем временную ссылку для мобильного устройства (v2)...');
            showMobileDownloadStatus('Подготовка файла для скачивания...', 'loading');

            // Создаем уникальное имя файла прямо на клиенте для надежности
            const uniqueFileName = `qstium.com_${new Date().getTime()}_${fileName.replace(/[^a-zA-Zа-яА-Я0-9.\-_]/g, '_')}`;

            // Формируем URL с параметрами
            const url = `${googleAppScriptUrl}?action=createTempFile&fileName=${encodeURIComponent(uniqueFileName)}`;

            // Отправляем содержимое файла как простой текст, чтобы избежать CORS preflight
            const response = await fetch(url, {
                method: 'POST',
                mode: 'cors', // Используем 'cors', так как Google Script вернет JSON с правильными заголовками
                headers: {
                    // Отправляем как обычный текст
                    'Content-Type': 'text/plain;charset=utf-8',
                },
                body: content // Отправляем содержимое файла напрямую
            });

            if (!response.ok) {
                throw new Error(`Ошибка сервера: ${response.statusText}`);
            }

            const result = await response.json();

            if (result.success && result.downloadUrl) {
                showMobileDownloadLink(fileName, result.downloadUrl, shareDialogTitlePrefix);
            } else {
                throw new Error(result.error || 'Не удалось создать временную ссылку');
            }

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

    function handleReadingModeChange() {
        if (readingModeCheckbox.checked) {
            // Если режим чтения включен, отключаем и сбрасываем ненужные опции
            shuffleQuestionsCheckbox.checked = false;
            shuffleQuestionsCheckbox.disabled = true;
            shuffleAnswersCheckbox.checked = false;
            shuffleAnswersCheckbox.disabled = true;
        } else {
            // Если выключен, снова делаем опции доступными
            shuffleQuestionsCheckbox.disabled = false;
            shuffleAnswersCheckbox.disabled = false;
        }
    }


    function processFile(fileName, fileContent) {
        originalFileNameForReview = fileName;
        allParsedQuestions = parseQstContent(fileContent);

        // Прячем лоадер, так как данные обработаны
        hideGlobalLoader();

        if (allParsedQuestions.length > 0) {
            saveRecentFile(fileName, fileContent);
            
            fileUploadArea.classList.add('hidden');
            searchResultsContainer.classList.add('hidden');
            quizSetupArea.classList.remove('hidden');
            
            questionRangeStartInput.value = 1;
            questionRangeStartInput.max = allParsedQuestions.length;
            questionRangeEndInput.value = allParsedQuestions.length;
            questionRangeEndInput.max = allParsedQuestions.length;
            maxQuestionsInfoEl.textContent = `(${_('total_questions_label')} ${allParsedQuestions.filter(q => q.type !== 'category').length})`;
        } else {
            alert(`${_('file_processing_failed_part1')}"${fileName}"${_('file_processing_failed_part2')}`);
        }
    }





    function parseQstContent(content) {
        let parsedQs = [];
        const lines = content.split(/\r?\n/);
        let currentQuestionData = null;
        for (const line of lines) {
            const trimmedLine = line.trim();

            // --- НАЧАЛО НОВОГО КОДА ---
            // ПРОВЕРКА НА КАТЕГОРИЮ
            if (trimmedLine.startsWith('#_#') && trimmedLine.endsWith('#_#')) {
                // Если мы нашли категорию, сначала сохраняем предыдущий вопрос, если он был
                if (currentQuestionData && currentQuestionData.options.length > 0) {
                    parsedQs.push(currentQuestionData);
                    currentQuestionData = null;
                }
                // Извлекаем название категории
                const categoryName = trimmedLine.slice(3, -3).trim();
                // Добавляем специальный объект с типом 'category'
                parsedQs.push({ text: categoryName, type: 'category' });
                // Переходим к следующей строке
                continue;
            }           
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
        // Фильтруем, пропуская категории и проверяя только настоящие вопросы
        return parsedQs.filter(q => q.type === 'category' || (q.options && q.options.some(opt => opt.isCorrect) && q.options.length > 1));
    }




    /**
     * Преобразует диапазон номеров вопросов в реальные индексы массива, пропуская категории.
     * @param {Array} sourceArray - Массив со всеми элементами (вопросами и категориями).
     * @param {number} startNum - Начальный номер вопроса (от пользователя).
     * @param {number} endNum - Конечный номер вопроса (от пользователя).
     * @returns {{startIndex: number, endIndex: number}} - Объект с начальным и конечным индексами.
     */
    function mapQuestionRangeToIndices(sourceArray, startNum, endNum) {
        let questionCounter = 0;
        let startIndex = -1;
        let endIndex = -1;
        
        // Фильтруем массив, чтобы работать только с реальными вопросами
        const onlyQuestions = sourceArray.filter(item => item.type !== 'category');
        
        // Проверяем, что диапазон не выходит за пределы количества вопросов
        if (startNum < 1) startNum = 1;
        if (endNum > onlyQuestions.length) endNum = onlyQuestions.length;

        sourceArray.forEach((item, index) => {
            // Считаем только реальные вопросы
            if (item.type !== 'category') {
                questionCounter++;
                
                // Находим индекс, соответствующий началу диапазона
                if (questionCounter === startNum && startIndex === -1) {
                    startIndex = index;
                }
                
                // Находим индекс, соответствующий концу диапазона
                if (questionCounter === endNum) {
                    endIndex = index;
                }
            }
        });

        // Если конечный индекс не был найден (например, диапазон до конца),
        // ищем до последнего элемента массива.
        if (endIndex === -1) {
            endIndex = sourceArray.length - 1;
        }

        return { startIndex, endIndex };
    }



    function applySettingsAndStartQuiz(isErrorReview = false, questionsSource = null) {
        let sourceArray;
        if (!isErrorReview) {
            quizSettings.timeLimit = parseInt(timeLimitInput.value);
            quizSettings.shuffleQuestions = shuffleQuestionsCheckbox.checked;
            quizSettings.shuffleAnswers = shuffleAnswersCheckbox.checked;
            quizSettings.feedbackMode = feedbackModeCheckbox.checked;
            quizSettings.readingMode = readingModeCheckbox.checked;
            
            const totalQuestionsCount = allParsedQuestions.filter(q => q.type !== 'category').length;
            
            let startRange = parseInt(questionRangeStartInput.value);
            let endRange = parseInt(questionRangeEndInput.value);

            if (isNaN(startRange) || startRange < 1) startRange = 1;
            if (isNaN(endRange) || endRange < startRange) endRange = totalQuestionsCount;
    
            const indices = mapQuestionRangeToIndices(allParsedQuestions, startRange, endRange);

            let finalStartIndex = indices.startIndex;
            if (indices.startIndex > 0 && allParsedQuestions[indices.startIndex - 1].type === 'category') {
                finalStartIndex = indices.startIndex - 1;
            }

            // --- НАЧАЛО ИЗМЕНЕНИЯ: Добавляем originalIndex ---
            sourceArray = allParsedQuestions.slice(finalStartIndex, indices.endIndex + 1)
                .map((question, localIndex) => ({
                    ...question,
                    // Запоминаем оригинальный индекс вопроса в полном массиве
                    originalIndex: finalStartIndex + localIndex
                }));     

        } else {
            sourceArray = questionsSource;
            quizSettings.timeLimit = 0;
            quizSettings.shuffleQuestions = false;
            quizSettings.shuffleAnswers = shuffleAnswersCheckbox.checked;
        }
        
        if (quizSettings.shuffleQuestions && !isErrorReview) {
            let shuffledQuiz = [];
            let questionGroup = [];

            sourceArray.forEach((item, index) => {
                if (item.type === 'category') {
                    if (questionGroup.length > 0) {
                        shuffleArray(questionGroup);
                        shuffledQuiz.push(...questionGroup);
                        questionGroup = []; 
                    }
                    shuffledQuiz.push(item);
                } else {
                    questionGroup.push(item);
                }
            });

            if (questionGroup.length > 0) {
                shuffleArray(questionGroup);
                shuffledQuiz.push(...questionGroup);
            }
            
            questionsForCurrentQuiz = shuffledQuiz;

        } else {
            questionsForCurrentQuiz = [...sourceArray];
        }

        questionsForCurrentQuiz = questionsForCurrentQuiz.map(q => JSON.parse(JSON.stringify(q)));
        triggerWordsUsedInQuiz = questionsForCurrentQuiz.some(q => q.type !== 'category' && q.triggeredWordIndices && q.triggeredWordIndices.length > 0);
        if (quizSettings.readingMode) {
            questionsForCurrentQuiz.forEach(q => {
                // Применяем логику только к вопросам, а не к категориям
                if (q.type !== 'category' && q.options && q.correctAnswerIndex > -1) {
                    // 1. Находим правильный ответ
                    const correctAnswer = q.options[q.correctAnswerIndex];
                    // 2. Удаляем его с текущей позиции
                    q.options.splice(q.correctAnswerIndex, 1);
                    // 3. Вставляем его в самое начало массива вариантов
                    q.options.unshift(correctAnswer);
                    // 4. Обновляем индекс правильного ответа на 0
                    q.correctAnswerIndex = 0;
                }
            });
        }

        if (quizSettings.shuffleAnswers) {
            questionsForCurrentQuiz.forEach(q => {
                if (q.type !== 'category' && q.options) {
                    const correctAnswerObject = q.options[q.correctAnswerIndex];
                    shuffleArray(q.options);
                    q.correctAnswerIndex = q.options.findIndex(opt => opt === correctAnswerObject);
                }
            });
        }
        
        if (questionsForCurrentQuiz.filter(q => q.type !== 'category').length === 0) {
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
        totalQuestionsNumEl.textContent = questionsForCurrentQuiz.filter(q => q.type !== 'category').length;
        updateScoreDisplay();
        setupTimer();
        generateQuickNav();
        webSearchDropdown?.classList.remove('hidden');
        finishTestButton?.classList.remove('hidden');
        continueLaterButton?.classList.remove('hidden');
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
        // Показываем панель, только если в тесте больше одного элемента (вопроса или категории)
        if (questionsForCurrentQuiz.length > 1) {
            quickNavPanel.classList.remove('hidden');
            
            let questionNumber = 1; // Заводим отдельный счетчик для нумерации ТОЛЬКО вопросов

            questionsForCurrentQuiz.forEach((item, index) => {
                // ЕСЛИ ЭТО КАТЕГОРИЯ
                if (item.type === 'category') {
                    const categoryHeader = document.createElement('div');
                    categoryHeader.className = 'quick-nav-category';
                    categoryHeader.textContent = item.text;
                    quickNavButtonsContainer.appendChild(categoryHeader);
                } 
                // ЕСЛИ ЭТО ОБЫЧНЫЙ ВОПРОС
                else {
                    const btn = document.createElement('button');
                    btn.classList.add('quick-nav-btn');
                    btn.textContent = questionNumber; // Используем наш счетчик
                    btn.dataset.questionIndex = index; // Сохраняем реальный индекс в массиве
                    btn.addEventListener('click', () => loadQuestion(index));
                    quickNavButtonsContainer.appendChild(btn);

                    questionNumber++; // Увеличиваем счетчик только для вопросов
                }
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



    function displayCategoryPage(categoryName) {
        // Показываем основной контейнер вопроса
        questionContainer.classList.remove('hidden');
        // Очищаем и форматируем текст
        questionTextEl.innerHTML = `
            <div class="quiz-category-screen">
                <span>Раздел:</span>
                <h2>${escapeHTML(categoryName)}</h2>
            </div>
        `;
        getEl('score').style.visibility = 'hidden';
        // Прячем ненужные элементы
        answerOptionsEl.innerHTML = '';
        feedbackAreaEl.textContent = '';
        feedbackAreaEl.className = 'feedback-area';
        copyQuestionBtnQuiz?.classList.add('hidden');
        getEl('favoriteQuestionBtn')?.classList.add('hidden');
        webSearchDropdown?.classList.add('hidden');
    }



    // ЗАМЕНИТЕ ВСЮ ФУНКЦИЮ loadQuestion
    function loadQuestion(index) {
        if (index < 0 || index >= questionsForCurrentQuiz.length) return;
        currentQuestionIndex = index;
        const item = questionsForCurrentQuiz[index];

        // --- ГЛАВНЫЙ РОУТЕР: ПРОВЕРЯЕМ ТИП ЭЛЕМЕНТА ---
        if (item.type === 'category') {
            displayCategoryPage(item.text); // Показываем экран категории
        } else {
            // Показываем счетчик только для настоящих вопросов
            getEl('score').style.visibility = 'visible';

            // Рассчитываем правильный номер вопроса, игнорируя категории
            const questionNumber = questionsForCurrentQuiz.slice(0, index + 1).filter(q => q.type !== 'category').length;
            currentQuestionNumEl.textContent = questionNumber;

            // Это обычный вопрос, показываем его как раньше
            questionTextEl.innerHTML = renderQuestionTextWithTriggers(item);
            addTriggerClickListeners();
            answerOptionsEl.innerHTML = '';
            feedbackAreaEl.textContent = '';
            feedbackAreaEl.className = 'feedback-area';
            
            copyQuestionBtnQuiz?.classList.remove('hidden');
            getEl('favoriteQuestionBtn')?.classList.remove('hidden');
            webSearchDropdown?.classList.remove('hidden');
            
            if (!item.options) {
                console.error("У вопроса отсутствуют опции:", item);
                answerOptionsEl.innerHTML = "<li>Ошибка: варианты ответов не найдены.</li>";
            } else {
                 item.options.forEach((option, i) => {
                    const li = document.createElement('li');
                    li.textContent = option.text;
                    li.dataset.index = i;
                    
                    if (userAnswers[index] && userAnswers[index].answered) {
                        li.classList.add('answered');
                        if (i === userAnswers[index].selectedOptionIndex) {
                            li.classList.add(userAnswers[index].correct ? 'correct' : 'incorrect');
                        }
                        if (!userAnswers[index].correct && i === item.correctAnswerIndex) {
                            li.classList.add('actual-correct');
                        }
                    } else {
                        li.addEventListener('click', handleAnswerSelect);
                    }
                    answerOptionsEl.appendChild(li);
                });
            }
        }
        
        // Обновляем общую навигацию для всех типов элементов
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
        nextButton.textContent = isLastQuestion ? _('finish_button') : _('next_question_button');
        nextButton.classList.toggle('finish-test', isLastQuestion);
    }

    function showResults() {
        localStorage.removeItem(SAVED_SESSIONS_STORAGE_KEY);
        window.removeEventListener('beforeunload', handleBeforeUnload);
        if (timerInterval) clearInterval(timerInterval);
        quizArea.classList.add('hidden');
        resultsArea.classList.remove('hidden');
        webSearchDropdown?.classList.add('hidden');
        finishTestButton?.classList.add('hidden');
        copyQuestionBtnQuiz?.classList.add('hidden');
        finalCorrectEl.textContent = score;
        const questionsInThisQuiz = questionsForCurrentQuiz.filter(q => q.type !== 'category');
        finalTotalEl.textContent = questionsInThisQuiz.length;
        const percentage = questionsInThisQuiz.length > 0 ? ((score / questionsInThisQuiz.length) * 100).toFixed(1) : 0;
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
        // Если мы сбрасываем тест, потому что начинаем новый,
        // а не потому что сохранили старый, то удаляем сохранение.
        if (clearInput) {
             localStorage.removeItem(SAVED_SESSIONS_STORAGE_KEY);
        }
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
        loadSavedSession();
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }


    function saveSessionForLater() {
        if (questionsForCurrentQuiz.length === 0) return;

        // 1. Создаем объект с данными НОВОЙ сессии
        const newSessionData = {
            questionOrderIndices: questionsForCurrentQuiz.map(q => q.originalIndex),
            userAnswers,
            currentQuestionIndex,
            score,
            quizSettings,
            timeLeftInSeconds,
            originalFileNameForReview,
            totalQuestionCount: questionsForCurrentQuiz.filter(q => q.type !== 'category').length,
            timestamp: new Date().getTime()
        };

        try {
            // 2. Читаем существующий массив сессий (или создаем пустой)
            const savedSessions = JSON.parse(localStorage.getItem(SAVED_SESSIONS_STORAGE_KEY)) || [];

            // 3. Ищем, есть ли уже сохранение для этого файла
            const existingSessionIndex = savedSessions.findIndex(
                session => session.originalFileNameForReview === newSessionData.originalFileNameForReview
            );

            if (existingSessionIndex > -1) {
                // Если есть - обновляем его
                savedSessions[existingSessionIndex] = newSessionData;
            } else {
                // Если нет - добавляем новое в массив
                savedSessions.push(newSessionData);
            }

            // 4. Сохраняем обновленный массив обратно в localStorage
            localStorage.setItem(SAVED_SESSIONS_STORAGE_KEY, JSON.stringify(savedSessions));

            alert('Тест сохранён! Вы можете продолжить его в любой момент с главного экрана.');
            resetQuizForNewFile(false);

        } catch (e) {
            console.error("Ошибка сохранения сессии в localStorage:", e);
            alert("Не удалось сохранить сессию. Возможно, в браузере закончилось место.");
        }
    }





    function loadSavedSession() {
        const savedSessionsJSON = localStorage.getItem(SAVED_SESSIONS_STORAGE_KEY);
        const sessions = savedSessionsJSON ? JSON.parse(savedSessionsJSON) : [];

        if (sessions.length === 0) {
            savedSessionArea.classList.add('hidden');
            savedSessionList.innerHTML = '';
            return;
        }

        let allCardsHTML = '';
        sessions.forEach(sessionData => {
            const totalQuestions = sessionData.totalQuestionCount;
            const answeredQuestions = sessionData.userAnswers.filter(a => a && a.answered).length;
            const progress = totalQuestions > 0 ? (answeredQuestions / totalQuestions) * 100 : 0;

            let timeInfo = '';
            if (sessionData.quizSettings.timeLimit > 0 && sessionData.timeLeftInSeconds) {
                const minutes = Math.floor(sessionData.timeLeftInSeconds / 60);
                const seconds = sessionData.timeLeftInSeconds % 60;
                timeInfo = `<div class="saved-session-time">${_('time_left')}: ${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}</div>`;
            }

            // ВАЖНО: Добавляем data-filename к кнопкам!
            allCardsHTML += `
                <div class="saved-session-card">
                    <div class="saved-session-name">${sessionData.originalFileNameForReview || 'Сохраненный тест'}</div>
                    <div class="saved-session-progress-info">
                        <span>${_('answered_of')} ${answeredQuestions} ${_('from')} ${totalQuestions}</span>
                        ${timeInfo}
                    </div>
                    <div class="progress-bar">
                        <div class="progress-bar-fill" style="width: ${progress}%;"></div>
                    </div>
                    <div class="saved-session-actions">
                        <button class="btn-resume" data-filename="${sessionData.originalFileNameForReview}">${_('continue_quiz_button')}</button>
                        <button class="btn-delete" data-filename="${sessionData.originalFileNameForReview}">${_('delete_session_button')}</button>
                    </div>
                </div>
            `;
        });

        savedSessionList.innerHTML = allCardsHTML;
        savedSessionArea.classList.remove('hidden');

        // Используем делегирование событий для всех кнопок
        savedSessionList.removeEventListener('click', handleSessionCardClick); // Сначала удаляем старый, чтобы не было дублей
        savedSessionList.addEventListener('click', handleSessionCardClick);
    }

    // Это новая функция-обработчик для кнопок в карточках
    function handleSessionCardClick(event) {
        const target = event.target;
        const fileName = target.dataset.filename;
        if (!fileName) return;

        if (target.classList.contains('btn-resume')) {
            restoreQuizSession(fileName);
        } else if (target.classList.contains('btn-delete')) {
            deleteSavedSession(fileName);
        }
    }

    function restoreQuizSession(fileName) { // <-- Принимает имя файла
        const savedSessionsJSON = localStorage.getItem(SAVED_SESSIONS_STORAGE_KEY);
        if (!savedSessionsJSON) return;
        
        const sessions = JSON.parse(savedSessionsJSON);
        const sessionData = sessions.find(s => s.originalFileNameForReview === fileName); // <-- Находим нужную сессию в массиве
        
        if (!sessionData) {
            alert("Ошибка: сохраненная сессия для этого файла не найдена.");
            return;
        }

        // 1. Находим исходный файл в "Недавно использованных"
        const recentFiles = JSON.parse(localStorage.getItem(RECENT_FILES_STORAGE_KEY)) || [];
        const originalFile = recentFiles.find(f => f.name === sessionData.originalFileNameForReview);

        if (!originalFile) {
            alert("Не удалось восстановить сессию. Исходный файл не найден в 'Недавно использованных'.");
            deleteSavedSession(); // Удаляем "осиротевшую" сессию
            return;
        }

        // 2. Заново парсим исходный файл, чтобы получить полный список вопросов
        allParsedQuestions = parseQstContent(originalFile.content);

        // 3. Восстанавливаем ТОЧНЫЙ порядок вопросов из сохраненной "карты"
        questionsForCurrentQuiz = sessionData.questionOrderIndices.map(originalIndex => {
            // Важно также добавить originalIndex обратно в каждый вопрос
            return { ...allParsedQuestions[originalIndex], originalIndex };
        });

        // 4. Восстанавливаем остальное состояние
        userAnswers = sessionData.userAnswers;
        currentQuestionIndex = sessionData.currentQuestionIndex;
        score = sessionData.score;
        quizSettings = sessionData.quizSettings;
        timeLeftInSeconds = sessionData.timeLeftInSeconds;
        originalFileNameForReview = sessionData.originalFileNameForReview;

        // 5. Переходим на экран теста
        fileUploadArea.classList.add('hidden');
        quizSetupArea.classList.add('hidden');
        quizArea.classList.remove('hidden');

        // 6. Запускаем UI теста с восстановленными данными
        totalQuestionsNumEl.textContent = questionsForCurrentQuiz.filter(q => q.type !== 'category').length;
        updateScoreDisplay();
        setupTimer();
        generateQuickNav();
        loadQuestion(currentQuestionIndex);

        // 7. Показываем нужные кнопки
        webSearchDropdown?.classList.remove('hidden');
        finishTestButton?.classList.remove('hidden');
        continueLaterButton?.classList.remove('hidden');
        copyQuestionBtnQuiz?.classList.remove('hidden');
        getEl('favoriteQuestionBtn')?.classList.remove('hidden');
        languageToggle?.classList.add('hidden');
        quickModeToggle?.classList.remove('hidden');
        triggerWordToggle?.classList.remove('hidden');

        // 8. Добавляем защиту от случайного закрытия вкладки
        window.addEventListener('beforeunload', handleBeforeUnload);
    }
    
    function deleteSavedSession(fileName) { // <-- Принимает имя файла
        if (confirm(`Вы уверены, что хотите удалить сохраненный тест "${fileName}"? Это действие необратимо.`)) {
            const savedSessionsJSON = localStorage.getItem(SAVED_SESSIONS_STORAGE_KEY);
            let sessions = savedSessionsJSON ? JSON.parse(savedSessionsJSON) : [];
            
            // Создаем новый массив, отфильтровав удаляемую сессию
            const updatedSessions = sessions.filter(s => s.originalFileNameForReview !== fileName);
            
            // Сохраняем новый массив
            localStorage.setItem(SAVED_SESSIONS_STORAGE_KEY, JSON.stringify(updatedSessions));
            
            // Перерисовываем интерфейс
            loadSavedSession();
        }
    }

 

    function loadTheme() {
        const currentTheme = localStorage.getItem('theme') || 'claude'; // По умолчанию ставим тему Claude
        document.body.classList.remove('dark-mode', 'claude-mode'); // Сначала убираем все классы тем

        if (currentTheme === 'dark') {
            document.body.classList.add('dark-mode');
            if (themeToggleButton) themeToggleButton.textContent = '☀️'; // Солнце для перехода на светлую
        } else if (currentTheme === 'claude') {
            document.body.classList.add('claude-mode');
            if (themeToggleButton) themeToggleButton.textContent = '🌙'; // Луна для перехода на темную
        } else {
            // Светлая тема (light) - нет класса
            if (themeToggleButton) themeToggleButton.textContent = '🌤️'; // Иконка Claude для перехода на нее
        }
    }

    function toggleTheme() {
        const themes = ['light', 'claude', 'dark']; // Определяем порядок переключения
        const currentTheme = localStorage.getItem('theme') || 'light';
        const currentIndex = themes.indexOf(currentTheme);
        const nextIndex = (currentIndex + 1) % themes.length; // Находим индекс следующей темы
        const newTheme = themes[nextIndex];

        localStorage.setItem('theme', newTheme);
        loadTheme(); // Вызываем обновленную функцию для применения темы и иконки
    }


    


    // --- НОВЫЕ ФУНКЦИИ ДЛЯ ПЕРЕВОДА ЯЗЫКА ---

    function setLanguage(lang) {
        // Сохраняем выбор пользователя
        localStorage.setItem('appLanguage', lang);
        
        // Вызываем переводчик чата
        ChatModule.setLanguage(lang);

        const translations = LANG_PACK[lang];

        // Обновляем текст на всех элементах с атрибутом data-lang-key
        document.querySelectorAll('[data-lang-key]').forEach(el => {
            const key = el.dataset.langKey;
            if (translations[key]) {
                if (el.placeholder) {
                    el.placeholder = translations[key];
                } else {
                    el.innerHTML = translations[key];
                }
            }
        });
        
        // Обновляем title у кнопок
        getEl('copyQuestionBtnQuiz').title = translations.copy_question_title;
        getEl('searchWebButton').title = translations.search_web_title;
        getEl('chatToggle').title = translations.chat_button_title;
        getEl('quickModeToggle').title = translations.quick_mode_title;
        getEl('triggerWordToggle').title = translations.trigger_words_title;
        getEl('themeToggle').title = translations.theme_button_title;
        getEl('languageToggle').title = translations.language_toggle_title;
        getEl('favoriteQuestionBtn').title = translations.favorite_button_title;
        
        // НОВАЯ ЛОГИКА ДЛЯ ТЕКСТА КНОПКИ
        const langs = ['ru', 'en', 'kz'];
        // Текст, который будет показан на кнопке, когда активен соответствующий язык
        const displayLangs = ['En', 'Қаз', 'Ру'];
        const currentIndex = langs.indexOf(lang);
        languageToggle.textContent = displayLangs[currentIndex];
        loadSavedSession();
    }



    function toggleLanguage() {
        const currentLang = localStorage.getItem('appLanguage') || 'ru';
        const langs = ['ru', 'en', 'kz']; // Массив доступных языков
        const currentIndex = langs.indexOf(currentLang);
        // Вычисляем следующий язык, зацикливая массив
        const nextIndex = (currentIndex + 1) % langs.length;
        const newLang = langs[nextIndex];
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

    // Вспомогательная функция для "умного" разделения на блоки
    function smartSplitIntoBlocks(text) {
        // Сначала заменяем двойные или более переносы строк на уникальный разделитель
        const withDelimiter = text.replace(/\n\s*\n/g, '<<<BLOCK_DELIMITER>>>');
        // Теперь добавляем разделитель перед тегами вопросов, если они не в начале строки
        const finalWithDelimiter = withDelimiter.replace(/\n(?=<Вопрос>|<question>)/gi, '<<<BLOCK_DELIMITER>>>');
        
        return finalWithDelimiter.split('<<<BLOCK_DELIMITER>>>').filter(b => b.trim() !== '');
    }

    // --- НАЧАЛО НОВОГО КОДА: ДВИЖОК ПАРСЕРА ---

    const PARSER_PATTERNS = [

        {
            id: 'plus_at_end_generic', // ИЗМЕНЕНИЕ: Новое, более общее имя
            name: "Ответ с '+' в конце строки",
            // Детектор: просто ищет плюс в конце строки. Очень надежно.
            detector: (text) => /\+\s*$/m.test(text),
            processor: (text) => {
                const questions = [];
                const blocks = smartSplitIntoBlocks(text);

                for (const block of blocks) {
                    const lines = block.trim().split('\n'); // Не удаляем пустые строки сразу
                    if (lines.length < 2) continue;

                    let questionLines = [];
                    const optionLines = [];
                    let correctAnswer = null;
                    
                    let firstOptionIndex = -1;

                    // ИЩЕМ ПЕРВУЮ СТРОКУ С ОТСТУПОМ (ТАБУЛЯЦИЕЙ ИЛИ ПРОБЕЛАМИ)
                    // Начинаем со второй строки (i=1), так как первая строка - всегда часть вопроса.
                    for (let i = 1; i < lines.length; i++) {
                        // Регулярное выражение /^\s/ ищет любой пробельный символ в начале строки
                        if (lines[i] && /^\s/.test(lines[i])) { 
                            firstOptionIndex = i;
                            break; // Нашли! Выходим из цикла.
                        }
                    }

                    // Если мы так и не нашли строку с отступом (на случай, если форматирование пропало),
                    // используем старый "запасной" вариант: считаем, что вопрос только в первой строке.
                    if (firstOptionIndex === -1) {
                        firstOptionIndex = 1;
                    }

                    questionLines = lines.slice(0, firstOptionIndex).filter(l => l.trim() !== '');
                    const rawOptionLines = lines.slice(firstOptionIndex).filter(l => l.trim() !== '');
                    
                    // Собираем текст вопроса, убирая возможную нумерацию в начале
                    const questionText = questionLines.join(' ').replace(/^\s*\d+\s*\.?\s*/, '').trim();

                    rawOptionLines.forEach(line => {
                        const trimmedLine = line.trim();
                        if (trimmedLine.endsWith('+')) {
                            const answer = trimmedLine.slice(0, -1).trim();
                            correctAnswer = answer;
                            optionLines.push(answer);
                        } else {
                            optionLines.push(trimmedLine);
                        }
                    });

                    if (questionText && correctAnswer) {
                        questions.push({
                            text: questionText,
                            options: optionLines,
                            correctAnswer: correctAnswer
                        });
                    }
                }
                return questions;
            }
        },

         
        {
            id: 'first_answer_correct_fallback',
            name: 'Без маркеров (первый ответ - верный)',
            // МОДИФИЦИРОВАННЫЙ ДЕТЕКТОР
            detector: (text) => {
                // 1. Быстрая отбраковка "мусорных" или пустых блоков
                if (!text || text.trim() === '') {
                    return false;
                }

                // 2. Проверяем, что в тексте НЕТ маркеров других, более точных форматов
                const hasPlusAtStart = /^\s*\+/m.test(text);
                const hasPlusAtEnd = /\+\s*$/m.test(text);
                const hasTags = /<question>|<variant>|<Вопрос>|<вариант>/i.test(text);

                // Если найден маркер другого формата, этот шаблон НЕ должен срабатывать
                if (hasPlusAtStart || hasPlusAtEnd || hasTags) {
                    return false;
                }

                // 3. НОВЫЕ ПРОВЕРКИ: Убеждаемся, что блок похож на настоящий вопрос
                const lines = text.trim().split('\n');
                const hasAtLeastTwoLines = lines.length >= 2;
                const hasLetters = /[a-zA-Zа-яА-Я]/.test(text); // Есть ли в тексте хоть одна буква

                // Шаблон сработает, ТОЛЬКО ЕСЛИ выполнены все условия:
                // это "чистый" текст, в нем минимум 2 строки И есть буквы.
                return hasAtLeastTwoLines && hasLetters;
            },
            processor: (text) => {
                const questions = [];
                const blocks = smartSplitIntoBlocks(text);

                for (const block of blocks) {
                    const lines = block.trim().split('\n').filter(l => l.trim() !== '');
                    if (lines.length < 2) continue;

                    const questionText = lines.shift().replace(/^\s*\d+\s*\.?\s*/, '').trim();
                    const options = lines.map(l => l.trim());
                    
                    if (questionText && options.length > 0) {
                        questions.push({
                            text: questionText,
                            options: options,
                            correctAnswer: options[0]
                        });
                    }
                }
                return questions;
            }
        },


        {
            id: 'numbered_list_plus_answer',
            name: 'Нумерованный список (1.) с ответом "+" в начале',
            // Детектор: ищет строки, начинающиеся с "цифра." и строки, начинающиеся с "+"
            detector: (text) => /^\s*\d+\./m.test(text) && /^\s*\+/m.test(text),
            processor: (text) => {
                const questions = [];
                let currentQuestion = null;
                const lines = text.split(/\r?\n/);

                for (const line of lines) {
                    const trimmedLine = line.trim();
                    if (trimmedLine === '') continue;

                    // Проверяем, начинается ли строка с номера (напр. "1.", "12. ")
                    if (/^\d+\.\s*/.test(trimmedLine)) {
                        // Если уже есть собранный вопрос, сохраняем его
                        if (currentQuestion && currentQuestion.correctAnswer) {
                            questions.push(currentQuestion);
                        }
                        // Начинаем новый вопрос, удаляя номер и точку в начале
                        currentQuestion = {
                            text: trimmedLine.replace(/^\d+\.\s*/, '').trim(),
                            options: [],
                            correctAnswer: null
                        };
                    } else if (trimmedLine.startsWith('+') && currentQuestion) {
                        // Это правильный ответ для текущего вопроса
                        const answerText = trimmedLine.substring(1).trim();
                        currentQuestion.correctAnswer = answerText;
                        currentQuestion.options.push(answerText);
                    } else if (currentQuestion && !currentQuestion.correctAnswer) {
                        // Это неверный вариант ответа (идет до правильного)
                        currentQuestion.options.push(trimmedLine);
                    } else if (currentQuestion && currentQuestion.correctAnswer) {
                        // Это неверный вариант ответа (идет после правильного)
                        currentQuestion.options.push(trimmedLine);
                    }
                }

                // Не забываем сохранить самый последний вопрос после окончания цикла
                if (currentQuestion && currentQuestion.correctAnswer) {
                    questions.push(currentQuestion);
                }

                return questions;
            }
        },


        {
            id: 'plus_at_start',
            name: 'Ответ с "+" в начале строки',
            // Ищет блок, где есть хотя бы одна строка, начинающаяся с "+"
            detector: (text) => text.split('\n').some(line => line.trim().startsWith('+')),
            processor: (text) => {
                const questions = [];
                const blocks = text.split(/\n\s*\n/); // Делим по пустым строкам
                for (const block of blocks) {
                    const lines = block.trim().split('\n').filter(l => l.trim() !== '');
                    if (lines.length < 2) continue;

                    const questionLines = [];
                    const optionLines = [];
                    let correctAnswer = null;

                    lines.forEach(line => {
                        const trimmedLine = line.trim();
                        if (trimmedLine.startsWith('+')) {
                            correctAnswer = trimmedLine.substring(1).trim();
                            optionLines.push(correctAnswer);
                        } else if (/^[a-zA-Zа-яА-Я0-9]/.test(trimmedLine) && correctAnswer !== null) {
                            optionLines.push(trimmedLine);
                        } else {
                            questionLines.push(trimmedLine);
                        }
                    });

                    if (questionLines.length > 0 && correctAnswer) {
                        questions.push({
                            text: questionLines.join(' '),
                            options: optionLines,
                            correctAnswer: correctAnswer
                        });
                    }
                }
                return questions;
            }
        },





        {
            id: 'tags_vopros_variant',
            name: 'Теги <Вопрос> и <вариант>',
            detector: (text) => /<Вопрос>|<вариант>/i.test(text),
            processor: (text) => {
                const questions = [];
                // Убираем нумерацию типа "1. <Вопрос>" или "2 <Вопрос>"
                const cleanedText = text.replace(/^\s*\d+\s*\.?\s*</gm, '<');
                const blocks = cleanedText.split(/<Вопрос>/i).filter(b => b.trim() !== '');

                for (const block of blocks) {
                    const parts = block.split(/<вариант>/i).map(p => p.trim());
                    if (parts.length < 2) continue;

                    const questionText = parts.shift();
                    // Примечание: правильный ответ не указан, берем первый
                    questions.push({
                        text: questionText,
                        options: parts,
                        correctAnswer: parts[0]
                    });
                }
                return questions;
            }
        },
        {
            id: 'tags_question_variant',
            name: 'Теги <question> и <variant>',
            detector: (text) => /<question|<variant>/i.test(text),
            processor: (text) => {
                const questions = [];
                const cleanedText = text.replace(/^\s*\d+\s*\.?\s*</gm, '<');
                const blocks = cleanedText.split(/<question.*?>/i).filter(b => b.trim() !== '');

                for (const block of blocks) {
                    const parts = block.split(/<variant>/i).map(p => p.trim().replace(/<\/?[^>]+(>|$)/g, "")); // Удаляем другие теги
                    if (parts.length < 2) continue;
                    
                    const questionText = parts.shift();
                    questions.push({
                        text: questionText,
                        options: parts,
                        correctAnswer: parts[0]
                    });
                }
                return questions;
            }
        }


    ];


    function processTextWithMultiFormat(text) {
        // === НАЧАЛО ИСПРАВЛЕНИЯ: Нормализация и ручной подсчёт индекса ===

        let allParsedQuestions = [];
        let parsingErrors = [];

        // 1. Нормализуем все переносы строк к единому формату '\n'.
        //    Это решает проблему с \r\n и делает подсчет надежным.
        const normalizedText = text.replace(/\r\n/g, '\n');
        const lines = normalizedText.split('\n');

        const processAndAddBlock = (blockLines, startIndex) => {
            if (blockLines.length === 0) return;
            const blockText = blockLines.join('\n');
            // Рассчитываем конечный индекс
            const endIndex = startIndex + blockText.length;

            const individualPatterns = PARSER_PATTERNS.filter(p => p.id !== 'multi_format');
            let blockParsed = false;

            for (const pattern of individualPatterns) {
                if (pattern.detector(blockText)) {
                    try {
                        const parsed = pattern.processor(blockText);
                        if (parsed.length > 0) {
                            allParsedQuestions.push(...parsed);
                            blockParsed = true;
                            break;
                        }
                    } catch (e) {
                        console.warn(`Ошибка при обработке блока шаблоном "${pattern.name}":`, e);
                    }
                }
            }
            if (!blockParsed) {
                console.warn("Не удалось определить формат для блока:\n---\n", blockText);
                parsingErrors.push({
                    text: blockText.trim(),
                    start: startIndex,
                    end: endIndex
                });
            }
        };

        // 2. Используем ручной подсчет индекса вместо ненадежного indexOf.
        let currentIndex = 0;
        let currentBlockLines = [];
        let currentBlockStartIndex = 0;

        lines.forEach(line => {
            const trimmedLine = line.trim();
            const isCategoryTag = trimmedLine.startsWith('#_#') && trimmedLine.endsWith('#_#');
            const isNewBlockStart = /^\s*\d+\.\s+/.test(trimmedLine) || /^\s*<question>|^\s*<Вопрос>/i.test(trimmedLine);
            
            if (isCategoryTag) {
                processAndAddBlock(currentBlockLines, currentBlockStartIndex);
                const categoryName = trimmedLine.slice(3, -3).trim();
                allParsedQuestions.push({ text: categoryName, type: 'category' });
                currentBlockLines = [];
            } else if (isNewBlockStart && currentBlockLines.length > 0) {
                processAndAddBlock(currentBlockLines, currentBlockStartIndex);
                currentBlockLines = [line];
                // Новый блок начинается с текущей позиции
                currentBlockStartIndex = currentIndex;
            } else {
                if (currentBlockLines.length === 0) {
                    // Это первая строка нового блока
                    currentBlockStartIndex = currentIndex;
                }
                currentBlockLines.push(line);
            }

            // 3. В конце каждой итерации сдвигаем индекс на длину строки + 1 (за символ '\n')
            currentIndex += line.length + 1;
        });

        // Не забываем обработать самый последний блок
        processAndAddBlock(currentBlockLines, currentBlockStartIndex);

        return {
            questions: allParsedQuestions,
            errors: parsingErrors
        };
        // === КОНЕЦ ИСПРАВЛЕНИЯ ===
    }




    function populateParserPatterns() {
        PARSER_PATTERNS.forEach(pattern => {
            const option = document.createElement('option');
            option.value = pattern.id;
            option.textContent = pattern.name;
            parserPatternSelect.appendChild(option);
        });
    }

    function handleParserFileInput(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            parserInput.value = e.target.result;
        };
        reader.readAsText(file, 'UTF-8');
    }



    /**
     * Отображает список ошибок и привязывает к ним клики для подсветки в нужном поле.
     * @param {HTMLTextAreaElement} targetTextarea - Поле, в котором будут подсвечиваться ошибки.
     * @param {Array<Object>} errors - Массив объектов ошибок.
     */
    function renderErrors(targetTextarea, errors) {
        const errorsArea = getEl('parserErrorsArea');
        const errorCountEl = getEl('errorCount');
        const errorListEl = getEl('errorList');

        if (!errorsArea || !errorCountEl || !errorListEl) return;

        errorListEl.innerHTML = ''; 
        errorCountEl.textContent = errors.length;
        errorsArea.classList.remove('hidden');

        errors.forEach(error => {
            const li = document.createElement('li');
            li.className = 'error-list-item';
            // Отображаем первую строку ошибки или специальный текст
            li.textContent = error.text.split('\n')[0].trim() || '[пустая строка]';
            li.title = `Нажмите, чтобы выделить ошибку:\n\n${error.text}`;
            
            // Привязываем клик к УНИВЕРСАЛЬНОЙ функции подсветки, передавая НУЖНОЕ поле
            li.addEventListener('click', () => {
                // ШАГ 1: Переключаем класс. Если он есть - убираем, если нет - добавляем.
                li.classList.toggle('reviewed');
                
                // ШАГ 2: Выполняем уже знакомое действие - подсветку в текстовом поле.
                highlightErrorInTextarea(targetTextarea, error.start, error.end);
            });
      
            
            errorListEl.appendChild(li);
        });
    }





    /**
     * Выделяет фрагмент текста в УКАЗАННОМ текстовом поле и прокручивает к нему.
     * @param {HTMLTextAreaElement} targetTextarea - Поле <textarea>, в котором нужно выделить текст.
     * @param {number} start - Начальный индекс для выделения.
     * @param {number} end - Конечный индекс для выделения.
     */
    function highlightErrorInTextarea(targetTextarea, start, end) {
        if (!targetTextarea) return;

        targetTextarea.focus();
        targetTextarea.setSelectionRange(start, end);

        const mirrorDiv = document.createElement('div');
        const computedStyle = getComputedStyle(targetTextarea);

        [
            'font', 'lineHeight', 'letterSpacing', 'wordSpacing',
            'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft',
            'borderTopWidth', 'borderRightWidth', 'borderBottomWidth', 'borderLeftWidth',
            'boxSizing', 'whiteSpace', 'wordWrap', 'wordBreak'
        ].forEach(prop => {
            mirrorDiv.style[prop] = computedStyle[prop];
        });

        mirrorDiv.style.position = 'absolute';
        mirrorDiv.style.top = '-9999px';
        mirrorDiv.style.left = '0px';
        mirrorDiv.style.width = targetTextarea.clientWidth + 'px';
        mirrorDiv.textContent = targetTextarea.value.substring(0, start) + '\u00A0';
        document.body.appendChild(mirrorDiv);

        const scrollPosition = mirrorDiv.scrollHeight - 180;
        targetTextarea.scrollTop = scrollPosition > 0 ? scrollPosition : 0;

        document.body.removeChild(mirrorDiv);
    }



    function hideAndResetErrorArea() {
        getEl('parserErrorsArea')?.classList.add('hidden');
        getEl('errorList').innerHTML = '';
        getEl('errorCount').textContent = '0';
    }

 

    function createVariantFilterCheckboxes() {
        if (!filterVariantCheckboxes) return;
        let checkboxesHTML = '';
        for (let i = 1; i <= 10; i++) {
            checkboxesHTML += `
                <label>
                    <input type="checkbox" value="${i}">${i}
                </label>
            `;
        }
        filterVariantCheckboxes.innerHTML = checkboxesHTML;
    }

    /**
     * Парсит готовый .qst текст для анализа количества вариантов.
     * @param {string} qstText - Текст из поля "Результат".
     * @returns {Array<Object>} Массив объектов вопросов { text, variantCount, start, end }.
     */
    function parseQstResultForFiltering(qstText) {
        const questions = [];
        const delimiterRegex = /\n\s*\n/g; // Регулярное выражение для поиска пустых строк-разделителей
        let lastIndex = 0; // Индекс, с которого начинаем искать следующий блок

        // Используем цикл с регулярным выражением, чтобы надежно проходить по всему тексту
        let match;
        while ((match = delimiterRegex.exec(qstText)) !== null) {
            // Текст блока - это всё, что находится между lastIndex и началом найденного разделителя
            const blockText = qstText.substring(lastIndex, match.index);
            const blockStart = lastIndex;

            if (blockText.trim() !== '') {
                const lines = blockText.split('\n');
                // Проверяем, что это действительно вопрос (начинается с "?")
                if (lines.some(l => l.trim().startsWith('?'))) {
                    const variantCount = lines.filter(l => l.trim().startsWith('+') || l.trim().startsWith('-')).length;
                    questions.push({
                        text: blockText,
                        variantCount: variantCount,
                        start: blockStart, // Надежная стартовая позиция
                        end: blockStart + blockText.length // Надежная конечная позиция
                    });
                }
            }
            // Сдвигаем курсор на позицию ПОСЛЕ найденного разделителя
            lastIndex = delimiterRegex.lastIndex;
        }

        // Не забываем обработать самый последний блок текста, после последнего разделителя
        const lastBlockText = qstText.substring(lastIndex);
        if (lastBlockText.trim() !== '') {
            const lines = lastBlockText.split('\n');
            if (lines.some(l => l.trim().startsWith('?'))) {
                const variantCount = lines.filter(l => l.trim().startsWith('+') || l.trim().startsWith('-')).length;
                questions.push({
                    text: lastBlockText,
                    variantCount: variantCount,
                    start: lastIndex,
                    end: lastIndex + lastBlockText.length
                });
            }
        }

        return questions;
    }

    function filterByVariantCount() {
        // Сначала сбрасываем старые ошибки
        hideAndResetErrorArea();

        const selectedCounts = Array.from(filterVariantCheckboxes.querySelectorAll('input:checked'))
                                    .map(input => parseInt(input.value));

        if (selectedCounts.length === 0) {
            alert("Не выбрано ни одного количества вариантов для фильтрации.");
            return;
        }

        const qstText = parserOutput.value;
        const allQuestions = parseQstResultForFiltering(qstText);
        
        const defectiveQuestions = allQuestions.filter(q => !selectedCounts.includes(q.variantCount));

        if (defectiveQuestions.length > 0) {
            // Адаптируем заголовок блока ошибок
            getEl('showErrorsBtn').innerHTML = `⚠️ Ошибки количества вариантов (<span id="errorCount">${defectiveQuestions.length}</span>)`;
            renderErrors(parserOutput, defectiveQuestions);
            alert(`Найдено ${defectiveQuestions.length} вопросов, не соответствующих фильтру.`);
        } else {
            alert("Все вопросы соответствуют заданному фильтру!");
        }
        filterVariantsDropdown.classList.add('hidden');
    }

    function resetVariantFilter() {
        filterVariantCheckboxes.querySelectorAll('input:checked').forEach(input => input.checked = false);
        hideAndResetErrorArea(); // Скрываем блок ошибок
        filterVariantsDropdown.classList.add('hidden');
    }


    function runParser() {
        resetVariantFilter();
        const text = parserInput.value;
        if (text.trim() === '') {
            alert("Поле для ввода текста пустое!");
            return;
        }

        hideAndResetErrorArea();
        parserOutputArea.classList.add('hidden');

        const selectedPatternId = parserPatternSelect.value;
        let result;

        if (selectedPatternId === 'auto') {
            result = processTextWithMultiFormat(text);
        } else {
            const pattern = PARSER_PATTERNS.find(p => p.id === selectedPatternId);
            if (!pattern) {
                alert("Произошла ошибка. Выбранный паттерн не найден.");
                return;
            }
            result = {
                questions: pattern.processor(text),
                errors: []
            };
        }

        const parsedQuestions = result.questions;
        const errors = result.errors;
        
        if (errors.length > 0) {
            renderErrors(parserInput, errors);
        }

        if (parsedQuestions.length === 0) {
            if (errors.length > 0) {
                alert(`Не удалось распознать ни одного вопроса. Обнаружено ошибок: ${errors.length}.`);
            } else {
                alert("Не удалось найти ни одного вопроса по выбранному формату. Попробуйте другой.");
            }
            return;
        }

        // --- НАЧАЛО ИЗМЕНЕНИЯ ---
        // Конвертируем в .qst формат, теперь с поддержкой категорий
        let qstResult = '';
        parsedQuestions.forEach(q => {
            // ЕСЛИ ЭТО КАТЕГОРИЯ
            if (q.type === 'category') {
                // Форматируем её в правильный синтаксис
                qstResult += `#_#${q.text}#_#\n\n`; // Двойной перенос для красивого разделения
            }
            // ЕСЛИ ЭТО ВОПРОС
            else {
                // Используем старую проверку только для вопросов
                if (q.text && q.options && q.options.length > 0) {
                    qstResult += `? ${q.text.replace(/\n/g, ' ')}\n`;
                    q.options.forEach(opt => {
                        const prefix = (opt === q.correctAnswer) ? '+' : '-';
                        qstResult += `${prefix} ${opt.replace(/\n/g, ' ')}\n`;
                    });
                    qstResult += '\n'; // Пустая строка после каждого вопроса
                }
            }
        });
        // --- КОНЕЦ ИЗМЕНЕНИЯ ---

        parserOutput.value = qstResult.trim();
        parserOutputArea.classList.remove('hidden');


        // НОВАЯ УНИФИЦИРОВАННАЯ ЛОГИКА УВЕДОМЛЕНИЯ
        if (errors.length > 0) {
            // Если есть ошибки, ВСЕГДА показываем подробное сообщение
            alert(`Операция завершена.\n\nРаспознано вопросов: ${parsedQuestions.length}\nОбнаружено ошибок форматирования: ${errors.length}`);
        } else {
            // И только если ошибок нет, показываем простое сообщение об успехе
            alert(`Успешно сконвертировано ${parsedQuestions.length} вопросов!`);
        }
    }



    async function downloadParsedQst() {
        const content = parserOutput.value;
        if (!content) return;
        await downloadOrShareFile('parsed_test.qst', content, 'text/plain;charset=utf-8', 'Сконвертированный тест');
    }


    function clearParserInput() {
        parserInput.value = '';
        parserFileInput.value = ''; // Важно также сбросить выбранный файл!
        parserInput.focus(); // Возвращаем курсор в поле для удобства
        hideAndResetErrorArea();
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
        showGlobalLoader: showGlobalLoader,
        hideGlobalLoader: hideGlobalLoader,
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
