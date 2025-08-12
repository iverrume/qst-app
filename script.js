  function shouldEnableLowPowerMode() {
    try {
      // navigator.hardwareConcurrency доступен в большинстве современных браузеров
      const coreCount = navigator.hardwareConcurrency || 2;
      // navigator.deviceMemory - экспериментальное API, может быть недоступно
      const memoryInGB = navigator.deviceMemory || 2;
      
      // Считаем устройство "слабым", если у него 4 или меньше ядер, ИЛИ 4 ГБ или меньше ОЗУ.
      const isWeakHardware = coreCount <= 4 || memoryInGB <= 4;
      
      // Проверяем системную настройку "Уменьшить движение"
      const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      // НОВАЯ СТРОКА: Проверяем, является ли устройство мобильным по User Agent
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      
      // ИЗМЕНЕНА ЭТА СТРОКА: Добавили в лог информацию о мобильном устройстве
      console.log(`Оценка производительности: Ядра=${coreCount}, Память=${memoryInGB}GB. Слабое железо: ${isWeakHardware}. Уменьшить движение: ${prefersReducedMotion}. Мобильное: ${isMobile}`);
      
      // ИЗМЕНЕНА ЭТА СТРОКА: Добавили проверку isMobile
      return isWeakHardware || prefersReducedMotion || isMobile;
    } catch (e) {
      console.warn("Не удалось определить производительность устройства, будет использован стандартный режим.", e);
      return false; // В случае ошибки, работаем в стандартном режиме
    }
  }

    // Применяем "легкий" режим, если нужно
    function applyLowPowerMode() {
      if (shouldEnableLowPowerMode()) {
        document.body.classList.add('low-power');
        console.log('Активирован режим низкой производительности (low-power).');
      }
    }

    // Вызываем функцию при старте приложения
    applyLowPowerMode();



// ============================================
// ИСПРАВЛЕННЫЙ МОДУЛЬ ЧАТА
// ============================================




const ChatModule = (function() {
    'use strict';

    const getEl = (id) => document.getElementById(id);

    const LOCALE_MAP = {
        ru: 'ru-RU',
        en: 'en-US',
        kk: 'kk-KZ'
    };

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
            auth_or_divider: "или",
            auth_google_signin: "Войти через Google",
            auth_forgot_password: "Забыли пароль?",
            forgot_password_modal_title: "Сброс пароля",
            forgot_password_modal_text: "Введите ваш email. Мы отправим вам ссылку для сброса пароля.",
            forgot_password_email_placeholder: "Ваш Email",
            forgot_password_send_button: "Отправить",
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
            clear_favorites_button: "🗑️ Очистить избранное", 
            question_label: "Вопрос:",
            author_label: "Автор:",
            date_label: "Дата:",
            anonymous_user: "Аноним",
            expand_message: "Развернуть", 
            collapse_message: "Свернуть",
            edited_indicator: "(изм.)", 
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
            create_question_placeholder: `Введите ваш вопрос в формате .qst\n\n?Столица Казахстана\n+Астана\n-Нур-Султан\n-Утера\n\n*Можно ввести сразу несколько`,
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
            question_deleted_message: "Этот вопрос был удален.",
            file_download_error: "Не удалось скачать файл:",
            test_start_error: "Не удалось запустить тест:",
            global_loader_loading_test: "Загрузка теста",
            password_reauth_required: "Для выполнения этого действия необходимо недавно войти в систему. Пожалуйста, выйдите и войдите снова.",
            channel_enter_password_prompt: "Канал '{channelName}' защищен. Введите пароль:",
            question_card_question_label: "Вопрос:",
            question_card_author_label: "Автор:",
            question_card_date_label: "Дата:",
            question_card_anonymous: "Аноним",
            testing_channel_option: "Канал для тестирования (с записью результатов)",
            results_button: "📊 Результаты",
            practice_test_button: "⚡️ Пробный тест",
            official_test_button: "🏆 Пройти тест",
            results_modal_title: "Результаты по тесту",
            results_table_header_num: "#",
            results_table_header_user: "Пользователь",
            results_table_header_accuracy: "Точность",
            results_table_header_time: "Время",
            results_empty_state: "По этому тесту пока нет результатов.",
            file_actions_modal_title: "Файл:",
            ai_helper_title: "AI-помощник",
            ai_summarize_from_selection: "Сводка с выбранного сообщения",
            ai_summarize_all: "Краткая сводка по всему каналу",
            ai_selection_banner_text: "Выберите сообщение, с которого начать сводку",
            ai_selection_cancel: "Отмена",
            ai_summary_title_selection: "💡 Сводка с выбранного сообщения:",
            ai_summary_title_all: "💡 Общая сводка по каналу:",
            password_reset_email_sent: "Письмо для сброса пароля отправлено! Пожалуйста, проверьте вашу почту (включая папку 'Спам').",
            error_user_not_found_for_reset: "Пользователь с таким email не найден.",
            ai_analyzing_chat: 'ИИ анализирует переписку...',
            chat_translate_button_title_on: "Показать оригинал",
            chat_translate_button_title_off: "Перевести чат",
            chat_translation_failed: "Ошибка перевода",
            ai_error_summary_generic: 'Не удалось получить сводку. Попробуйте еще раз.',
            ai_error_summary_server: 'Не удалось получить сводку: Произошла временная ошибка на сервере. Пожалуйста, повторите попытку позже.',
            smart_timestamp_yesterday: 'Вчера',
            delete_favorite_button: '🗑️ Удалить из избранного',
            error_no_messages_to_select: 'В этом канале еще нет сообщений для выбора.',
            chat_online_list_empty: 'В сети никого нет',
            chat_user_actions_for: 'Действия для пользователя {userName}',
            chat_kick_user_confirm: 'Вы уверены, что хотите удалить этого участника из канала?',
            kick_user_button: 'Удалить',
            chat_kick_user_fail: 'Не удалось удалить участника.',
            chat_cannot_delete_general_alert: 'Основной канал удалить нельзя.',
            chat_delete_channel_fail_alert: 'Не удалось удалить канал.',
            chat_channel_name_empty_alert: 'Название канала не может быть пустым.',
            chat_create_channel_fail_alert: 'Не удалось создать канал.',
            chat_favorites_empty_to_clear: 'Избранное уже пусто.',
            chat_profile_update_password_error: 'Пароль должен быть не менее 6 символов.',
            chat_profile_update_success: 'Профиль успешно обновлен!',
            chat_profile_update_fail_prefix: 'Ошибка обновления профиля:',
            error_upload_file_type: "Можно загружать только файлы .qst и .txt",
            error_fetch_file_id_failed: 'Не удалось получить ID файла после загрузки.',
            error_upload_failed: 'Загрузка файла не удалась.',
            error_file_process_failed: 'Ошибка при обработке файла.',
            chat_file_download_failed: 'Не удалось скачать файл из чата: {error}',
            error_start_test_failed: 'Не удалось запустить тест: {error}',
            chat_analyze_no_messages: 'Нет сообщений для анализа.',
            chat_analyze_no_valid_messages: 'Нет подходящих сообщений для анализа.',
            chat_test_results_empty: 'По этому тесту пока нет результатов.',
            chat_test_results_loading_error: 'Ошибка загрузки результатов теста:',
            chat_check_question_status_failed: 'Не удалось проверить статус вопроса.',
            chat_question_deleted_alert: 'Этот вопрос был удален.',
            chat_show_all_messages: 'Показать все сообщения',

            chat_show_pinned_messages: 'Показать закрепленные',
            tooltip_reply: 'Ответить',
            tooltip_add_reaction: 'Добавить реакцию',
            tooltip_pin: 'Закрепить',
            tooltip_unpin: 'Открепить',
            tooltip_edit_message: 'Редактировать сообщение',
            tooltip_delete_message: 'Удалить сообщение',

            download_file_question_label: "Вопрос",
            download_file_answer_label: "Ответ",
            download_file_message_label: "Сообщение",

            error_save_message_failed: 'Не удалось сохранить изменения.',
            error_delete_question_failed: 'Не удалось удалить вопрос.',
            error_question_parse_failed_detailed: 'Не удалось распознать вопросы. Проверьте формат: каждый вопрос должен начинаться с "?", а варианты с "+" или "-".',
            error_vote_failed: 'Не удалось проголосовать.',
            error_add_favorite_failed: 'Не удалось добавить в избранное',
            error_remove_favorite_failed: 'Не удалось удалить из избранного',
            error_start_private_chat_failed: 'Не удалось начать личный чат.',
            error_send_message_failed: 'Не удалось отправить сообщение',

            share_title_favorites: "Избранное",
            share_title_questions: "Вопросы",
            share_title_generic_file: "Файл",

            tooltip_choose_reaction: 'Выбрать другую реакцию',

            default_channel_name: "Общий",
            default_channel_desc: "Основной канал для общения",

            error_pin_message_failed: "Не удалось изменить статус закрепления сообщения.",
            error_create_question_failed: "Не удалось создать вопрос(ы).",
            error_clear_favorites_failed: "Не удалось очистить избранное.",
            error_copy_question_failed: "Не удалось скопировать вопрос.",
            error_download_system_unavailable: "Система скачивания недоступна. Перезагрузите страницу и попробуйте снова.",

            error_vote_favorite_failed: "Не удалось проголосовать в избранном.",
            error_save_channel_failed: "Не удалось сохранить изменения.",
            error_remove_from_favorites_failed: "Не удалось удалить из избранного.",
            error_delete_message_failed: 'Не удалось удалить сообщение.',
            error_download_auth_required: "Для скачивания необходимо авторизоваться в чате.",
            sidebar_search_placeholder: 'Поиск каналов...',
            error_add_to_favorites_failed: "Не удалось добавить в избранное.",
            auth_required_to_view: 'Войдите для просмотра',
            ai_summary_modal_title: '💡 Сводка от ИИ',

            reauth_wrong_password: "Неверный пароль. Попробуйте еще раз.",
            results_modal_title: "Результаты по тесту",
            results_table_header_num: "#",
            results_table_header_user: "Пользователь",
            results_table_header_accuracy: "Точность",
            results_table_header_time: "Время",
            results_empty_state: "По этому тесту пока нет результатов."


        },
        kk: {
            // TABS
            tab_messages: "Хабарламалар",
            tab_questions: "Сұрақтар",
            tab_favorites: "Таңдаулылар",
            tab_users: "Пайдаланушылар",
            // Auth
            auth_title: "🔐 Авторизация",
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
            auth_or_divider: "немесе",
            auth_google_signin: "Google арқылы кіру",
            auth_forgot_password: "Құпия сөзді ұмыттыңыз ба?",
            forgot_password_modal_title: "Құпия сөзді қалпына келтіру",
            forgot_password_modal_text: "Email мекенжайыңызды енгізіңіз. Біз сізге құпия сөзді қалпына келтіру сілтемесін жібереміз.",
            forgot_password_email_placeholder: "Сіздің Email",
            forgot_password_send_button: "Жіберу",
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
            reply_panel_title: "Жауап беру:",
            emoji_button_title: "Эмодзи",
            create_question_button_title: "Сұрақ құру",
            attach_file_button_title: "Файлды тіркеу",
            chat_input_placeholder: "Хабарлама енгізіңіз...",
            download_qst_button: "📥 .qst жүктеп алу",
            download_txt_button: "📥 .txt жүктеп алу",
            add_to_favorites_button: "⭐ Таңдаулыларға қосу",
            copy_question_button: "📋 Көшіру",
            delete_question_button: "🗑️ Сұрақты жою",
            clear_favorites_button: "🗑️ Таңдаулыларды тазарту",
            question_label: "Сұрақ:",
            author_label: "Авторы:",
            date_label: "Күні:",
            anonymous_user: "Аноним",
            expand_message: "Көбірек көрсету",
            collapse_message: "Жасыру",
            edited_indicator: "(өзг.)",
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
            create_question_placeholder: `Сұрағыңызды .qst пішімінде енгізіңіз\n\n?Қазақстанның астанасы\n+Астана\n-Нұр-Сұлтан\n-Утера\n\n*Бірден бірнеше сұрақ енгізуге болады`,
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
            question_deleted_message: "Бұл сұрақ жойылды.",
            file_download_error: "Файлды жүктеу мүмкін болмады:",
            test_start_error: "Тестті бастау мүмкін болмады:",
            global_loader_loading_test: "Тест жүктелуде",
            password_reauth_required: "Бұл әрекетті орындау үшін жақында кіру қажет. Шығып, қайта кіріңіз.",
            channel_enter_password_prompt: "'{channelName}' арнасы қорғалған. Құпия сөзді енгізіңіз:",
            question_card_question_label: "Сұрақ:",
            question_card_author_label: "Авторы:",
            question_card_date_label: "Күні:",
            question_card_anonymous: "Аноним",
            testing_channel_option: "Тестілеу арнасы (нәтижелерді жазумен)",
            results_button: "📊 Нәтижелер",
            practice_test_button: "⚡️ Сынақ тесті",
            official_test_button: "🏆 Тестті өту",
            results_modal_title: "Тест нәтижелері",
            results_table_header_num: "#",
            results_table_header_user: "Пайдаланушы",
            results_table_header_accuracy: "Дәлдік",
            results_table_header_time: "Уақыт",
            results_empty_state: "Бұл тест бойынша әзірге нәтиже жоқ.",
            file_actions_modal_title: "Файл:",
            ai_helper_title: "AI-көмекші",
            ai_summarize_from_selection: "Таңдалған хабарламадан қорытынды",
            ai_summarize_all: "Бүкіл арнаның қысқаша түйіндемесі",
            ai_selection_cancel: "Болдырмау",
            ai_summary_title_selection: "💡 Таңдалған хабарламадан бастап түйіндеме:",
            ai_selection_banner_text: "Қорытындыны бастайтын хабарламаны таңдаңыз",
            ai_summary_title_all: "💡 Арна бойынша жалпы түйіндеме:",
            password_reset_email_sent: "Құпия сөзді қалпына келтіру хаты жіберілді! Поштаңызды тексеріңіз ('Спам' қалтасын қоса).",
            error_user_not_found_for_reset: "Бұл email-мен пайдаланушы табылмады.",
            ai_analyzing_chat: 'ЖИ хат алмасуды талдауда...',
            chat_translate_button_title_on: "Түпнұсқаны көрсету",
            chat_translate_button_title_off: "Чатты аудару",
            chat_translation_failed: "Аудару қатесі",
            ai_error_summary_generic: 'Түйіндемені алу мүмкін болмады. Қайталап көріңіз.',
            ai_error_summary_server: 'Түйіндемені алу мүмкін болмады: Серверде уақытша қате пайда болды. Кейінірек қайталап көріңіз.',
            smart_timestamp_yesterday: 'Кеше',
            delete_favorite_button: '🗑️ Таңдаулылардан жою',
            error_no_messages_to_select: 'Бұл арнада таңдау үшін хабарламалар әлі жоқ.',
            chat_online_list_empty: 'Желіде ешкім жоқ',
            chat_user_actions_for: '{userName} пайдаланушысы үшін әрекеттер',
            chat_kick_user_confirm: 'Осы мүшені арнадан алғыңыз келетініне сенімдісіз бе?',
            kick_user_button: 'Жою',
            chat_kick_user_fail: 'Мүшені жою мүмкін болмады.',
            chat_cannot_delete_general_alert: 'Негізгі арнаны жою мүмкін емес.',
            chat_delete_channel_fail_alert: 'Арнаны жою мүмкін болмады.',
            chat_channel_name_empty_alert: 'Арна атауы бос болмауы керек.',
            chat_create_channel_fail_alert: 'Арнаны құру мүмкін болмады.',
            chat_favorites_empty_to_clear: 'Таңдаулылар қазірдің өзінде бос.',
            chat_profile_update_password_error: 'Құпия сөз кемінде 6 таңбадан тұруы керек.',
            chat_profile_update_success: 'Профиль сәтті жаңартылды!',
            chat_profile_update_fail_prefix: 'Профильді жаңарту қатесі:',
            error_upload_file_type: "Тек .qst және .txt файлдарын жүктеуге болады",
            error_fetch_file_id_failed: 'Жүктеуден кейін файл ID-ін алу мүмкін болмады.',
            error_upload_failed: 'Файлды жүктеу сәтсіз аяқталды.',
            error_file_process_failed: 'Файлды өңдеу кезінде қате пайда болды.',
            chat_file_download_failed: 'Чаттан файлды жүктеу мүмкін болмады: {error}',
            error_start_test_failed: 'Тестті бастау мүмкін болмады: {error}',
            chat_analyze_no_messages: 'Талдау үшін хабарламалар жоқ.',
            chat_analyze_no_valid_messages: 'Талдауға жарамды хабарламалар жоқ.',
            chat_test_results_empty: 'Бұл тест бойынша әзірге нәтиже жоқ.',
            chat_test_results_loading_error: 'Тест нәтижелерін жүктеу қатесі:',
            chat_check_question_status_failed: 'Сұрақтың күйін тексеру мүмкін болмады.',
            chat_question_deleted_alert: 'Бұл сұрақ жойылды.',
            chat_show_all_messages: 'Барлық хабарламаларды көрсету',
            chat_show_pinned_messages: 'Бекітілгендерді көрсету',

            tooltip_reply: 'Жауап беру',
            tooltip_add_reaction: 'Реакция қосу',
            tooltip_pin: 'Бекіту',
            tooltip_unpin: 'Бекітуден алу',
            tooltip_edit_message: 'Хабарламаны өңдеу',
            tooltip_delete_message: 'Хабарламаны жою',

            download_file_question_label: "Сұрақ",
            download_file_answer_label: "Жауап",
            download_file_message_label: "Хабарлама",

            error_save_message_failed: 'Өзгерістерді сақтау мүмкін болмады.',
            error_delete_question_failed: 'Сұрақты жою мүмкін болмады.',
            error_question_parse_failed_detailed: 'Сұрақтарды тану мүмкін болмады. Пішімді тексеріңіз: әр сұрақ "?"-тен, ал нұсқалар "+" немесе "-"-тен басталуы керек.',
            error_vote_failed: 'Дауыс беру мүмкін болмады.',
            error_add_favorite_failed: 'Таңдаулыларға қосу мүмкін болмады',
            error_remove_favorite_failed: 'Таңдаулылардан жою мүмкін болмады',
            error_start_private_chat_failed: 'Жеке чатты бастау мүмкін болмады.',
            error_send_message_failed: 'Хабарламаны жіберу мүмкін болмады',

            share_title_favorites: "Таңдаулылар",
            share_title_questions: "Сұрақтар",
            share_title_generic_file: "Файл",

            tooltip_choose_reaction: 'Басқа реакцияны таңдау',

            default_channel_name: "Жалпы",
            default_channel_desc: "Негізгі сөйлесу арнасы",

            error_pin_message_failed: "Хабарламаны бекіту күйін өзгерту мүмкін болмады.",
            error_create_question_failed: "Сұрақ(тар)ды құру мүмкін болмады.",
            error_clear_favorites_failed: "Таңдаулыларды тазарту мүмкін болмады.",
            error_copy_question_failed: "Сұрақты көшіру мүмкін болмады.",
            error_download_system_unavailable: "Жүктеу жүйесі қолжетімсіз. Бетті қайта жүктеп, әрекетті қайталаңыз.",

            error_vote_favorite_failed: "Таңдаулыларда дауыс беру мүмкін болмады.",
            error_save_channel_failed: "Өзгерістерді сақтау мүмкін болмады.",
            error_remove_from_favorites_failed: "Таңдаулылардан жою мүмкін болмады.",
            error_add_to_favorites_failed: "Таңдаулыларға қосу мүмкін болмады.",
            error_delete_message_failed: 'Хабарламаны жою мүмкін болмады.',
            error_download_auth_required: 'Жүктеп алу үшін чатқа кіруіңіз қажет.',
            sidebar_search_placeholder: 'Арналарды іздеу...',
            auth_required_to_view: 'Көру үшін кіріңіз',
            ai_summary_modal_title: '💡 ЖИ түйіндемесі',

            reauth_wrong_password: "Қате құпия сөз. Қайталап көріңіз.",
            results_modal_title: "Тест нәтижелері",
            results_table_header_num: "#",
            results_table_header_user: "Пайдаланушы",
            results_table_header_accuracy: "Дәлдік",
            results_table_header_time: "Уақыт",
            results_empty_state: "Бұл тест бойынша әзірге нәтиже жоқ."
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
            auth_or_divider: "or",
            auth_google_signin: "Sign in with Google",
            auth_forgot_password: "Forgot password?",
            forgot_password_modal_title: "Reset Password",
            forgot_password_modal_text: "Enter your email. We'll send you a link to reset your password.",
            forgot_password_email_placeholder: "Your Email",
            forgot_password_send_button: "Send",
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
            reply_panel_title: "Replying to:",
            emoji_button_title: "Emoji",
            create_question_button_title: "Create Question",
            attach_file_button_title: "Attach File",
            chat_input_placeholder: "Enter a message...",
            download_qst_button: "📥 Download .qst",
            download_txt_button: "📥 Download .txt",
            add_to_favorites_button: "⭐ Add to Favorites",
            copy_question_button: "📋 Copy",
            delete_question_button: "🗑️ Delete Question",
            clear_favorites_button: "🗑️ Clear Favorites",
            question_label: "Question:",
            author_label: "Author:",
            date_label: "Date:",
            anonymous_user: "Anonymous",
            expand_message: "Read more", 
            collapse_message: "Show less", 
            edited_indicator: "(edited)",
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
            create_question_placeholder: `Enter your question in .qst format\n\n?Capital of Kazakhstan\n+Astana\n-Nur-Sultan\n-Utera\n\n*You can enter multiple questions at once`,
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
            question_deleted_message: "This question has been deleted.",
            file_download_error: "Failed to download file:",
            test_start_error: "Failed to start test:",
            global_loader_loading_test: "Loading test",
            password_reauth_required: "This action requires a recent login. Please log out and log in again.",
            channel_enter_password_prompt: "Channel '{channelName}' is protected. Please enter the password:",
            question_card_question_label: "Question:",
            question_card_author_label: "Author:",
            question_card_date_label: "Date:",
            question_card_anonymous: "Anonymous",
            testing_channel_option: "Testing channel (with result tracking)",
            results_button: "📊 Results",
            practice_test_button: "⚡️ Practice Test",
            official_test_button: "🏆 Take Test",
            results_modal_title: "Test Results",
            results_table_header_num: "#",
            results_table_header_user: "User",
            results_table_header_accuracy: "Accuracy",
            results_table_header_time: "Time",
            results_empty_state: "There are no results for this test yet.",
            file_actions_modal_title: "File:",
            ai_helper_title: "AI Assistant",
            ai_summarize_from_selection: "Summarize from selection",
            ai_summarize_all: "Summarize entire channel",
            ai_selection_banner_text: "Select a message to start the summary from",
            ai_selection_cancel: "Cancel",
            ai_summary_title_selection: "💡 Summary from selected message:",
            ai_summary_title_all: "💡 General channel summary:",
            password_reset_email_sent: "Password reset email sent! Please check your inbox (including the spam folder).",
            error_user_not_found_for_reset: "User with this email not found.",
            ai_analyzing_chat: 'AI is analyzing the chat...',
            chat_translate_button_title_on: "Show Original",
            chat_translate_button_title_off: "Translate Chat",
            chat_translation_failed: "Translation failed",
            ai_error_summary_generic: 'Failed to get summary. Please try again.',
            ai_error_summary_server: 'Failed to get summary: A temporary server error occurred. Please try again later.',
            smart_timestamp_yesterday: 'Yesterday',
            delete_favorite_button: '🗑️ Remove from Favorites',
            error_no_messages_to_select: 'There are no messages in this channel to select yet.',
            chat_online_list_empty: 'No one is online',
            chat_user_actions_for: 'Actions for user {userName}',
            chat_kick_user_confirm: 'Are you sure you want to remove this member from the channel?',
            kick_user_button: 'Remove',
            chat_kick_user_fail: 'Failed to remove member.',
            chat_cannot_delete_general_alert: 'The main channel cannot be deleted.',
            chat_delete_channel_fail_alert: 'Failed to delete channel.',
            chat_channel_name_empty_alert: 'Channel name cannot be empty.',
            chat_create_channel_fail_alert: 'Failed to create channel.',
            chat_favorites_empty_to_clear: 'Favorites is already empty.',
            chat_profile_update_password_error: 'Password must be at least 6 characters.',
            chat_profile_update_success: 'Profile updated successfully!',
            chat_profile_update_fail_prefix: 'Profile update failed:',
            error_upload_file_type: "Only .qst and .txt files can be uploaded",
            error_fetch_file_id_failed: 'Failed to get file ID after upload.',
            error_upload_failed: 'File upload failed.',
            error_file_process_failed: 'Error processing file.',
            chat_file_download_failed: 'Failed to download file from chat: {error}',
            error_start_test_failed: 'Failed to start test: {error}',
            chat_analyze_no_messages: 'No messages to analyze.',
            chat_analyze_no_valid_messages: 'No suitable messages to analyze.',
            chat_test_results_empty: 'There are no results for this test yet.',
            chat_test_results_loading_error: 'Error loading test results:',
            chat_check_question_status_failed: 'Could not check question status.',
            chat_question_deleted_alert: 'This question has been deleted.',
            chat_show_all_messages: 'Show all messages',
            chat_show_pinned_messages: 'Show pinned messages',

            tooltip_reply: 'Reply',
            tooltip_add_reaction: 'Add reaction',
            tooltip_pin: 'Pin',
            tooltip_unpin: 'Unpin',
            tooltip_edit_message: 'Edit message',
            tooltip_delete_message: 'Delete message',

            download_file_question_label: "Question",
            download_file_answer_label: "Answer",
            download_file_message_label: "Message",

            error_save_message_failed: 'Failed to save changes.',
            error_delete_question_failed: 'Failed to delete question.',
            error_question_parse_failed_detailed: 'Could not recognize questions. Check the format: each question must start with "?", and options with "+" or "-".',
            error_vote_failed: 'Failed to vote.',
            error_add_favorite_failed: 'Failed to add to favorites',
            error_remove_favorite_failed: 'Failed to remove from favorites',
            error_start_private_chat_failed: 'Failed to start private chat.',
            error_send_message_failed: 'Failed to send message',

            share_title_favorites: "Favorites",
            share_title_questions: "Questions",
            share_title_generic_file: "File",

            tooltip_choose_reaction: 'Choose another reaction',

            default_channel_name: "General",
            default_channel_desc: "The main channel for communication",

            error_pin_message_failed: "Failed to change message pin status.",
            error_create_question_failed: "Failed to create question(s).",
            error_clear_favorites_failed: "Failed to clear favorites.",
            error_copy_question_failed: "Failed to copy the question.",
            error_download_system_unavailable: "The download system is unavailable. Please reload the page and try again.",

            error_vote_favorite_failed: "Failed to vote in favorites.",
            error_save_channel_failed: "Failed to save changes.",
            error_remove_from_favorites_failed: "Failed to remove from favorites.",
            error_add_to_favorites_failed: "Failed to add to favorites.",

            error_delete_message_failed: 'Failed to delete message.',
            error_download_auth_required: 'You must be logged in to download from the chat.',
            sidebar_search_placeholder: 'Search channels...',
            auth_required_to_view: 'Login to view',
            ai_summary_modal_title: '💡 AI Summary',

            reauth_wrong_password: "Incorrect password. Please try again.",
            results_modal_title: "Test Results",
            results_table_header_num: "#",
            results_table_header_user: "User",
            results_table_header_accuracy: "Accuracy",
            results_table_header_time: "Time",
            results_empty_state: "There are no results for this test yet."
        }
    };




    let currentChatLang = localStorage.getItem('chatLanguage') || 'ru';

    function _chat(key) {
        return LANG_PACK_CHAT[currentChatLang]?.[key] || key;
    }
/**
     * Форматирует строку перевода, заменяя плейсхолдеры типа {key} на значения.
     * @param {string} key - Ключ строки в языковом пакете.
     * @param {object} replacements - Объект с заменами, например { channelName: 'VIP' }.
     * @returns {string} - Отформатированная строка.
     */
    function _chatFormat(key, replacements) {
        let str = _chat(key);
        for (const placeholder in replacements) {
            str = str.replace(`{${placeholder}}`, replacements[placeholder]);
        }
        return str;
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
    let isAiSelectionMode = false;
    let isChatTranslateModeEnabled = false; // Состояние режима перевода
    let chatTranslations = new Map(); // Кэш для уже переведенных сообщений

    let messagesListener = null; // Cлушатель для сообщений
    let pmUnreadListener = null; // Слушатель для ЛИЧНЫХ непрочитанных
    let publicUnreadListener = null; // Слушатель для ПУБЛИЧНЫХ непрочитанных
    let listenerInitializationTime = null; // ВРЕМЯ ЗАПУСКА СЛУШАТЕЛЯ
    let questionsListener = null; // СЛУШАТЕЛЬ ДЛЯ ВОПРОСОВ

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
    let chatSearchToggleBtn = null;
    let lastMessageObserver = null; 

    // Tabs configuration
    const TABS = {
        messages: { langKey: 'tab_messages', icon: '💬', collection: 'messages' },
        questions: { langKey: 'tab_questions', icon: '❓', collection: 'questions' },
        favorites: { langKey: 'tab_favorites', icon: '⭐', collection: 'favorites' },
        users: { langKey: 'tab_users', icon: '👥' }
    };

    /**
     * НОВАЯ ФУНКЦИЯ-ПОМОЩНИК (ВНУТРИ CHATMODULE)
     * Создает уникальный ключ для кэша сообщений чата, комбинируя ID и язык.
     * @param {string} messageId - ID сообщения.
     * @param {string} lang - Код языка (например, 'ru', 'en').
     * @returns {string} - Комбинированный ключ (например, 'xyz-123_en').
     */
    function getChatCacheKey(messageId, lang) {
        return `${messageId}_${lang}`;
    }

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


  

    function init(firebaseDb, firebaseAuth) {
        try {
            db = firebaseDb;
            auth = firebaseAuth;
            
            // 1. Создаем HTML
            createHybridChatHTML();
            
            // 2. Находим элементы
            initDOMElements();
            
            // 3. Добавляем обработчики
            setupEventListeners();
            
            // 4. Запускаем остальное
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

        // Сначала удаляем старые версии чата, если они вдруг остались на странице
        const oldChats = document.querySelectorAll('#chatOverlay, #advancedChatOverlay');
        oldChats.forEach(chat => chat.remove());
        
        // Вся HTML-структура в одной переменной
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
                    <div class="password-wrapper">
                        <input type="password" class="auth-input" id="loginPassword" placeholder="${_chat('auth_password_placeholder')}" required>
                        <span class="toggle-password">👁️</span>
                    </div>
                    <a href="#" id="forgotPasswordLink" class="forgot-password-link">${_chat('auth_forgot_password')}</a>
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

                <div style="text-align: center; margin: 20px 0; color: var(--secondary-text-color);">${_chat('auth_or_divider')}</div>
                
                <button id="googleSignInBtn" class="google-signin-btn">
                    <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google icon">
                    ${_chat('auth_google_signin')}
                </button>
                
                <button id="authCloseButton" onclick="ChatModule.closeAuthModal()" style="margin-top: 15px; background: none; border: none; color: var(--secondary-text-color); cursor: pointer;">
                    ${_chat('auth_close_button')}
                </button>
            </div>
        </div>

        <!-- ГИБРИДНЫЙ ЧАТ (полный код, как и ранее) -->
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
                            <div class="sidebar-section">
                                <h4>${_chat('sidebar_sections')}</h4>
                                <div id="chatTabsList" class="tabs-list">
                                    <div class="tab-item active" data-tab="messages"><span class="tab-icon">💬</span><span class="tab-name">${_chat('tab_messages')}</span><span class="tab-counter" id="messagesCount">0</span></div>
                                    <div class="tab-item" data-tab="questions"><span class="tab-icon">❓</span><span class="tab-name">${_chat('tab_questions')}</span><span class="tab-counter" id="questionsCount">0</span></div>
                                    <div class="tab-item" data-tab="favorites"><span class="tab-icon">⭐</span><span class="tab-name">${_chat('tab_favorites')}</span><span class="tab-counter" id="favoritesCount">0</span></div>
                                    <div class="tab-item" data-tab="users"><span class="tab-icon">👥</span><span class="tab-name">${_chat('tab_users')}</span><span class="tab-counter" id="usersCount">0</span></div>
                                </div>
                            </div>
                            <div class="sidebar-section">
                                <h4>${_chat('sidebar_channels')}</h4>
                                <div class="sidebar-search-container"><input type="text" id="channelSearchInput" class="sidebar-search-input" placeholder="${_chat('sidebar_search_placeholder')}"></div>
                                <div id="channelsList" class="channels-list"></div>
                                <button id="createChannelBtn" class="create-btn">${_chat('sidebar_create_channel')}</button>
                            </div>
                            <div class="sidebar-section" id="privateChatsSection">
                                <h4>${_chat('sidebar_private_messages')}</h4>
                                <div id="privateChatsList" class="channels-list"></div>
                            </div>                            
                            <div class="sidebar-section">
                                <h4><span class="online-label">${_chat('sidebar_online')}</span> (<span id="onlineCount">0</span>)</h4>
                                <div id="onlineUsersList" class="online-users-list"></div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Main chat area -->
                    <div class="chat-main-content">
                        <div class="chat-top-bar">
                            <h4 id="currentChannelName" style="margin: 0; flex-grow: 1; text-align: left; color: var(--heading-color);">${_chat('channel_general')}</h4>
                            <button id="chatSearchToggleBtn" class="chat-search-toggle">🔍</button>
                            <input type="text" id="chatSearchInput" placeholder="${_chat('search_placeholder')}" />
                            <!-- Кнопка "Закрепить" ПОЛНОСТЬЮ УДАЛЕНА ОТСЮДА -->
                        </div>
                        <div id="aiSelectionBanner" class="ai-selection-banner hidden">
                            <span>${_chat('ai_selection_banner_text')}</span>
                            <button id="cancelAiSelectionBtn" class="btn-secondary-small">${_chat('ai_selection_cancel')}</button>
                        </div>
                        <div id="tabActionsContainer" class="tab-actions-container hidden"></div>
                        <div id="messageArea" class="message-area"><div class="empty-state">${_chat('loading_messages')}</div></div>
                        <div class="chat-input-area">
                            <div id="replyingToPanel" class="replying-to-panel hidden">
                                <div class="reply-info"><span>${_chat('reply_panel_title')}</span><p id="replyingToText"></p></div>
                                <button onclick="ChatModule.cancelReply()" class="cancel-reply-btn">×</button>
                            </div>


                            <div class="input-actions-top">
                                <button id="emojiBtn" class="input-action-btn" title="${_chat('emoji_button_title')}">😊</button>
                                <button id="questionBtn" class="input-action-btn" title="${_chat('create_question_button_title')}">❓</button>
                                <button id="uploadFileBtn" class="input-action-btn" title="${_chat('attach_file_button_title')}">📎</button>
                                <button id="togglePinnedBtn" class="input-action-btn" title="${_chat('pinned_toggle_title')}">📌</button>
                                <button id="chatTranslateBtn" class="input-action-btn" title="Перевести чат">अ|а</button>
                                <div class="ai-helper-container">
                                    <button id="aiChatHelperBtn" class="input-action-btn" title="${_chat('ai_helper_title')}">🤖</button>
                                    <div id="aiChatHelperMenu" class="ai-helper-menu hidden">



                                        <a href="#" data-action="summarize-from-selection">${_chat('ai_summarize_from_selection')}</a>
                                        <a href="#" data-action="summarize-all">${_chat('ai_summarize_all')}</a>
                                    </div>
                                </div>
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
        <div id="userActionsModal" class="modal-overlay hidden"><div class="modal-content"><h3 id="userActionsModalTitle">${_chat('user_actions_title')}</h3><p id="userActionsModalText" style="margin-bottom: 25px;">${_chat('user_actions_text')}</p><div class="modal-buttons vertical"><button id="userActionsChatBtn">${_chat('user_actions_chat_button')}</button><button id="userActionsEmailBtn">${_chat('user_actions_email_button')}</button><button onclick="ChatModule.closeModal('userActionsModal')" style="background-color: var(--button-secondary-bg); color: var(--button-secondary-text);">${_chat('modal_cancel_button')}</button></div></div></div>
        <div id="channelEditModal" class="modal-overlay hidden"><div class="modal-content"><h3>${_chat('channel_settings_title')}</h3><input type="hidden" id="editChannelId"><input type="text" id="editChannelNameInput" placeholder="${_chat('channel_edit_name_placeholder')}" required /><input type="password" id="editChannelPasswordInput" placeholder="${_chat('channel_edit_password_placeholder')}" /><textarea id="editChannelDescInput" placeholder="${_chat('channel_edit_desc_placeholder')}"></textarea><div id="channelMembersSection" class="channel-members-section hidden"><h4>${_chat('channel_members_title')}</h4><ul id="channelMembersList" class="channel-members-list"><li>${_chat('channel_members_loading')}</li></ul></div><div class="modal-buttons"><button onclick="ChatModule.saveChannelEdit()">${_chat('modal_save_button')}</button><button onclick="ChatModule.closeModal('channelEditModal')">${_chat('modal_cancel_button')}</button></div><button id="deleteChannelBtn" class="delete-btn" onclick="ChatModule.deleteChannel()" style="margin-top: 15px;">${_chat('delete_channel_button')}</button></div></div>
        <div id="channelCreateModal" class="modal-overlay hidden"><div class="modal-content"><h3>${_chat('create_channel_title')}</h3><input type="text" id="channelNameInput" placeholder="${_chat('channel_create_name_placeholder')}" required /><input type="password" id="channelPasswordInput" placeholder="${_chat('channel_create_password_placeholder')}" /><textarea id="channelDescInput" placeholder="${_chat('channel_create_desc_placeholder')}"></textarea><div class="settings-group" style="text-align: left; margin-top: 15px;"><input type="checkbox" id="channelIsForTesting"><label for="channelIsForTesting" data-lang-key="testing_channel_option">${_chat('testing_channel_option')}</label></div><div class="modal-buttons"><button onclick="ChatModule.createChannel()">${_chat('modal_create_button')}</button><button onclick="ChatModule.closeModal('channelCreateModal')">${_chat('modal_cancel_button')}</button></div></div></div>
        <div id="questionCreateModal" class="modal-overlay hidden"><div class="modal-content"><h3>${_chat('create_question_title')}</h3><textarea id="questionTextInput" placeholder="${_chat('create_question_placeholder')}" rows="4"></textarea><div class="modal-buttons"><button onclick="ChatModule.createQuestion()">${_chat('create_question_modal_button')}</button><button onclick="ChatModule.closeModal('questionCreateModal')">${_chat('modal_cancel_button')}</button></div></div></div>
        <div id="editMessageModal" class="modal-overlay hidden"><div class="modal-content"><h3>${_chat('edit_message_title')}</h3><textarea id="editMessageInput" rows="4"></textarea><input type="hidden" id="editMessageIdInput"><div class="modal-buttons"><button onclick="ChatModule.saveMessageEdit()">${_chat('modal_save_button')}</button><button onclick="ChatModule.closeModal('editMessageModal')">${_chat('modal_cancel_button')}</button></div></div></div>
        <div id="profileEditModal" class="modal-overlay hidden"><div class="modal-content"><h3>${_chat('edit_profile_title')}</h3><input type="text" id="profileDisplayName" placeholder="${_chat('edit_profile_name_placeholder')}" /><input type="email" id="profileEmail" placeholder="Email" readonly /><input type="password" id="profileNewPassword" placeholder="${_chat('edit_profile_new_password_placeholder')}" /><div class="modal-buttons"><button onclick="ChatModule.saveProfile()">${_chat('modal_save_button')}</button><button onclick="ChatModule.closeModal('profileEditModal')">${_chat('modal_cancel_button')}</button></div><button id="deleteAccountBtn" class="delete-btn" onclick="ChatModule.deleteAccount()" style="margin-top: 15px;">${_chat('delete_account_button')}</button></div></div>
        <div id="fileActionsModal" class="modal-overlay hidden"><div class="modal-content"><h3 id="fileActionsModalTitle">${_chat('file_actions_title')}</h3><p id="fileActionsModalText" style="margin-bottom: 25px;">${_chat('user_actions_text')}</p><div class="modal-buttons vertical"><button id="fileActionDownloadBtn">${_chat('file_actions_download')}</button><button id="fileActionTestBtn">${_chat('file_actions_test')}</button><button onclick="ChatModule.closeModal('fileActionsModal')" style="background-color: var(--button-secondary-bg); color: var(--button-secondary-text);">${_chat('modal_cancel_button')}</button></div></div></div>

        <div id="aiSummaryModal" class="modal-overlay hidden">
            <div class="modal-content" style="max-width: 600px; text-align: left;">
                <h3 id="aiSummaryModalTitle">${_chat('ai_summary_modal_title')}</h3>
                <div id="aiSummaryOutput" style="max-height: 60vh; overflow-y: auto; line-height: 1.6;">
                    <!-- Сюда будет вставляться сводка или спиннер -->
                </div>
                <div class="modal-buttons" style="margin-top: 20px;">
                    <button onclick="ChatModule.closeModal('aiSummaryModal')" data-lang-key="auth_close_button">Закрыть</button>
                </div>
            </div>
        </div>

        <div id="forgotPasswordModal" class="modal-overlay hidden">  <!-- <== ТЕПЕРЬ ЭТОТ БЛОК НАХОДИТСЯ НА ПРАВИЛЬНОМ УРОВНЕ -->
            <div class="modal-content">
                <h3 data-lang-key="forgot_password_modal_title">${_chat('forgot_password_modal_title')}</h3>
                <p style="margin-bottom: 20px;" data-lang-key="forgot_password_modal_text">${_chat('forgot_password_modal_text')}</p>
                <input type="email" id="resetEmailInput" class="auth-input" placeholder="${_chat('forgot_password_email_placeholder')}" required />
                <div class="modal-buttons">
                    <button onclick="ChatModule.handlePasswordReset()" data-lang-key="forgot_password_send_button">${_chat('forgot_password_send_button')}</button>
                    <button onclick="ChatModule.closeModal('forgotPasswordModal')" data-lang-key="modal_cancel_button">${_chat('modal_cancel_button')}</button>
                </div>
            </div>
        </div>
        `;

        document.body.insertAdjacentHTML('beforeend', chatHTML);
    }

 
    async function signInWithGoogle() {
        if (!auth) {
            showError('Система аутентификации не доступна');
            return;
        }

        const provider = new firebase.auth.GoogleAuthProvider();

        try {
            const result = await auth.signInWithPopup(provider);
            const user = result.user;

            // Проверяем, новый ли это пользователь
            if (result.additionalUserInfo.isNewUser) {
                console.log('Новый пользователь Google, сохраняем в Firestore:', user.displayName);
                // Если пользователь новый, сохраняем его данные в нашей базе
                await db.collection('users').doc(user.uid).set({
                    username: user.displayName,
                    email: user.email,
                    uid: user.uid,
                    privateChatPartners: [],
                    createdAt: firebase.firestore.FieldValue.serverTimestamp()
                });
            }

            // Закрываем модальное окно и открываем чат, если нужно
            ChatModule.closeAuthModal();
            if (openChatAfterAuth) {
                openChatAfterAuth = false;
                ChatModule.openChatModal();
            }

        } catch (error) {
            console.error('Ошибка входа через Google:', error);
            showError(getErrorMessage(error.code));
        }
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
        const forgotLink = getEl('forgotPasswordLink');
        if (forgotLink) forgotLink.textContent = _chat('auth_forgot_password');
        
        const forgotModal = getEl('forgotPasswordModal');
        if (forgotModal) {
            forgotModal.querySelector('[data-lang-key="forgot_password_modal_title"]').textContent = _chat('forgot_password_modal_title');
            forgotModal.querySelector('[data-lang-key="forgot_password_modal_text"]').textContent = _chat('forgot_password_modal_text');
            forgotModal.querySelector('#resetEmailInput').placeholder = _chat('forgot_password_email_placeholder');
            forgotModal.querySelector('[data-lang-key="forgot_password_send_button"]').textContent = _chat('forgot_password_send_button');
            forgotModal.querySelector('[data-lang-key="modal_cancel_button"]').textContent = _chat('modal_cancel_button');
        }


        const googleBtn = document.getElementById('googleSignInBtn');
        if (googleBtn) {
            googleBtn.innerHTML = `
                <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google icon">
                ${_chat('auth_google_signin')}
            `;
        }

        document.getElementById('authCloseButton').textContent = _chat('auth_close_button');

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
        document.querySelector('.online-label').textContent = _chat('sidebar_online');
        
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

        // Перевод опции в модальном окне создания канала
        const testingChannelLabel = document.querySelector('label[for="channelIsForTesting"]');
        if (testingChannelLabel) {
            testingChannelLabel.textContent = _chat('testing_channel_option');
        }

        // Перевод элементов в модальном окне результатов
        const resultsModal = document.getElementById('testResultsModal');
        if (resultsModal) {
            const title = resultsModal.querySelector('#testResultsModalTitle');
            const closeButton = resultsModal.querySelector('button[onclick*="closeModal"]');
            
            if (title) title.textContent = _chat('results_modal_title');
            if (closeButton) closeButton.textContent = _chat('auth_close_button');
        }

        const aiModal = document.getElementById('aiExplanationModal');
        if (aiModal) {
            // Находим кнопку "Закрыть" внутри этого модального окна.
            // Используем более точный селектор, чтобы не затронуть другие кнопки.
            const closeButton = aiModal.querySelector('button[data-lang-key="auth_close_button"]');
            if (closeButton) {
                closeButton.textContent = _chat('auth_close_button');
            }
        }


        // Перевод AI-помощника и его модального окна ===
        const aiHelperBtn = getEl('aiChatHelperBtn');
        if (aiHelperBtn) {
            aiHelperBtn.title = _chat('ai_helper_title');
        }

        const aiHelperMenu = getEl('aiChatHelperMenu');
        if (aiHelperMenu) {
            const summarizeSelectionLink = aiHelperMenu.querySelector('[data-action="summarize-from-selection"]');
            if (summarizeSelectionLink) summarizeSelectionLink.textContent = _chat('ai_summarize_from_selection');

            const summarizeAllLink = aiHelperMenu.querySelector('[data-action="summarize-all"]');
            if (summarizeAllLink) summarizeAllLink.textContent = _chat('ai_summarize_all');
        }
        
        const aiSelectionBanner = getEl('aiSelectionBanner');
        if (aiSelectionBanner) {
            const bannerText = aiSelectionBanner.querySelector('span');
            if (bannerText) bannerText.textContent = _chat('ai_selection_banner_text');
            
            const cancelBtn = aiSelectionBanner.querySelector('#cancelAiSelectionBtn');
            if (cancelBtn) cancelBtn.textContent = _chat('ai_selection_cancel');
        }

        
        
        const aiSummaryModal = getEl('aiSummaryModal');
        if (aiSummaryModal) {
            const closeBtn = aiSummaryModal.querySelector('button[onclick*="closeModal"]');
            if (closeBtn) closeBtn.textContent = _chat('auth_close_button');
        }
        
        // =======================
        // НОВЫЙ КОД (ДОБАВИТЬ)
        // =======================
        // Специальная проверка для перевода названия активного канала "# Общий"
        const currentChannelNameEl = getEl('currentChannelName');
        if (currentChannelNameEl && currentChannel === 'general') {
            // Если текущий канал - "general", принудительно обновляем его заголовок
            // из языкового пакета. Для других каналов мы этого не делаем,
            // так как их названия созданы пользователями и не должны переводиться.
            currentChannelNameEl.textContent = _chat('channel_general');
        }
        // =======================
        // КОНЕЦ НОВОГО КОДА
        // =======================

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
        chatSearchToggleBtn = document.getElementById('chatSearchToggleBtn');
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
        document.getElementById('googleSignInBtn')?.addEventListener('click', signInWithGoogle);
        document.getElementById('forgotPasswordLink')?.addEventListener('click', (e) => {
            e.preventDefault(); // Отменяем стандартное поведение ссылки
            showModal('forgotPasswordModal');
        });


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


        // Добавляем обработчик для кнопки "Отмена" на плашке
        getEl('cancelAiSelectionBtn')?.addEventListener('click', cancelAiSummarySelection);

        // Используем делегирование событий для клика по сообщению в режиме выбора
        messageArea.addEventListener('click', handleAiMessageSelection);
        getEl('chatTranslateBtn')?.addEventListener('click', toggleChatTranslation);

        const aiHelperBtn = getEl('aiChatHelperBtn');
        const aiHelperMenu = getEl('aiChatHelperMenu');

        if (aiHelperBtn && aiHelperMenu) {
            aiHelperBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                aiHelperMenu.classList.toggle('hidden');
            });

            aiHelperMenu.addEventListener('click', (e) => {
                e.preventDefault();
                const target = e.target.closest('a');
                if (target && target.dataset.action) {
                    const action = target.dataset.action;
                    aiHelperMenu.classList.add('hidden');
                    
                    if (action === 'summarize-from-selection') {
                        startAiSummarySelection(); // Запускаем режим выбора
                    } else if (action === 'summarize-all') {
                        getAIChatSummary(action);  // Вызываем сводку по всем
                    }
                }
            });

            // Скрываем меню при клике в любом другом месте
            window.addEventListener('click', () => {
                if (!aiHelperMenu.classList.contains('hidden')) {
                    aiHelperMenu.classList.add('hidden');
                }
            });


        // НОВЫЙ ОБРАБОТЧИК ДЛЯ ВСЕХ ДЕЙСТВИЙ ВНУТРИ СООБЩЕНИЙ
        messageArea.addEventListener('click', (event) => {
            const target = event.target;
            const actionTarget = target.closest('[data-action]');
            if (!actionTarget) return;

            const action = actionTarget.dataset.action;
            const messageEl = actionTarget.closest('.message');
            if (!messageEl && !action.includes('question')) return; // Для ссылок на вопросы messageEl может не быть

            const messageId = messageEl?.id.replace('message-', '');
            const messageText = messageEl?.dataset.rawText || '';
            const authorName = messageEl?.querySelector('.author')?.textContent || _chat('anonymous_user');

            switch (action) {
                case 'reply':
                    startReply(messageId, authorName, messageText);
                    break;
                case 'show-reaction-picker':
                    showReactionPicker(messageId, actionTarget);
                    break;
                case 'toggle-pin':
                    togglePinMessage(messageId);
                    break;
                case 'edit':
                    startEditMessage(messageId, messageText);
                    break;
                case 'delete':
                    deleteMessage(messageId);
                    break;
                case 'toggle-reaction':
                    toggleReaction(messageId, actionTarget.dataset.emoji);
                    break;
                case 'scroll-to':
                    scrollToMessage(actionTarget.dataset.messageId);
                    break;
                case 'navigate-to-question':
                    navigateToQuestion(actionTarget.dataset.questionId, actionTarget.dataset.messageId);
                    break;
                case 'show-file-actions':
                    const isTesting = actionTarget.dataset.isTesting === 'true';
                    showFileActionsModal(actionTarget.dataset.fileId, actionTarget.dataset.fileName, isTesting);
                    break;
                case 'show-results':
                    showTestResults(actionTarget.dataset.fileId, actionTarget.dataset.channelId);
                    break;
            }
        });




        }




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

    // === НАЧАЛО НОВОГО КОДА: ЛОГИКА МОБИЛЬНОГО ПОИСКА ===

        // Клик по иконке "лупы" на мобильных
        if (chatSearchToggleBtn) {
            chatSearchToggleBtn.addEventListener('click', () => {
                const topBar = chatSearchToggleBtn.closest('.chat-top-bar');
                if (topBar) {
                    topBar.classList.add('search-active');
                    // Сразу ставим фокус на поле ввода для удобства
                    searchInput.focus();
                }
            });
        }

        // Когда пользователь убирает фокус с поля ввода (кликает в другое место)
        if (searchInput) {
            searchInput.addEventListener('blur', () => {
                const topBar = searchInput.closest('.chat-top-bar');
                // Проверяем, есть ли текст в поле. Если есть, не скрываем.
                if (topBar && searchInput.value.trim() === '') {
                    topBar.classList.remove('search-active');
                }
            });
        }

        // === КОНЕЦ НОВОГО КОДА ===

        const channelSearchInput = document.getElementById('channelSearchInput');
        if (channelSearchInput) {
            
            // Создаем функцию-обработчик
            const handleChannelSearch = (event) => {
                const query = event.target.value.toLowerCase().trim();
                const channels = document.querySelectorAll('#channelsList .channel-item');
                
                channels.forEach(channel => {
                    const channelName = channel.textContent.toLowerCase();
                    if (channelName.includes(query)) {
                        channel.style.display = 'flex'; // Используем flex, т.к. у .channel-item такой display
                    } else {
                        channel.style.display = 'none';
                    }
                });
            };

            // Применяем debounce, чтобы поиск не срабатывал на каждую букву
            const debouncedChannelSearch = debounce(handleChannelSearch, 250);
            channelSearchInput.addEventListener('input', debouncedChannelSearch);

        }

        // --- ДОБАВЛЕННЫЙ КОД ---

        // Делегирование событий для кнопок редактирования сообщений
        messageArea.addEventListener('click', function(event) {
            // Проверяем, была ли нажата именно кнопка с классом 'edit-message-btn'
            const editButton = event.target.closest('.edit-message-btn');
            
            if (editButton) {
                const messageId = editButton.dataset.messageId;
                const messageText = editButton.dataset.rawText; // Получаем текст из нашего безопасного свойства
                
                // Вызываем функцию редактирования с полученными данными
                ChatModule.startEditMessage(messageId, messageText);
            }
        });

        
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
            // СТАЛО (скопируйте и замените)
            if (isUnread) {
                const isPrivateMessage = !messageData.memberIds.includes('public');
                const isUnlockedPublicChannel = messageData.memberIds.includes('public') && (messageData.channelId === 'general' || unlockedChannels.has(messageData.channelId));

                if (isPrivateMessage || isUnlockedPublicChannel) {
                    updateUnreadCount(messageData.channelId, 1);

                    // --- ВОТ ОНО, ИСПРАВЛЕНИЕ! ---
                    // Если пришло личное сообщение, перерисовываем список личных чатов.
                    // Это гарантирует, что чат появится в списке, и счетчик на нем отобразится.
                    if (isPrivateMessage) loadPrivateChats(); 
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

// script.js (вставить новую функцию в ChatModule)

    /**
     * Находит все сообщения пользователя в текущем DOM и обновляет его имя.
     * @param {string} userId - ID пользователя, чье имя нужно обновить.
     * @param {string} newName - Новое имя пользователя.
     */
    function updateAuthorNameInView(userId, newName) {
        if (!messageArea || !userId || !newName) return;
        
        // Находим все сообщения, которые мы пометили нашим data-атрибутом
        const userMessages = messageArea.querySelectorAll(`.message[data-author-id="${userId}"]`);
        
        userMessages.forEach(msgElement => {
            // В каждом сообщении находим элемент с именем автора
            const authorEl = msgElement.querySelector('.author');
            if (authorEl) {
                // И просто меняем его текстовое содержимое
                authorEl.textContent = newName;
            }
        });
        console.log(`Обновлено имя для ${userMessages.length} сообщений в DOM.`);
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
            showError(_chat('fill_all_fields')); 
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
        const errorKeys = {
            'auth/user-not-found': 'error_user_not_found',
            'auth/wrong-password': 'error_wrong_password',
            'auth/email-already-in-use': 'error_email_in_use',
            'auth/weak-password': 'error_weak_password',
            'auth/invalid-email': 'error_invalid_email',
            'auth/too-many-requests': 'error_too_many_requests'
        };
        const key = errorKeys[errorCode] || 'error_generic';
        return _chat(key); // Используем систему переводов
    }
    function showError(message) { alert(message); }
    
    // ========== TAB SWITCHING ==========
    function switchTab(tabId) {
        if (!TABS[tabId] || tabId === currentTab) return; // Не делаем ничего, если кликнули на активную вкладку

        // --- НОВЫЙ БЛОК ОЧИСТКИ ---
        // Перед переключением, отписываемся от слушателя СТАРОЙ вкладки
        if (currentTab === 'questions' && questionsListener) {
            questionsListener(); // Вызов функции отписки
            questionsListener = null; // Сбрасываем переменную
        }
        if (currentTab === 'favorites' && favoritesListener) {
            favoritesListener(); // Вызов функции отписки
            favoritesListener = null; // Сбрасываем переменную
        }
        // --- КОНЕЦ НОВОГО БЛОКА ---

        currentTab = tabId;

        // Если мы переключились на вкладку сообщений, сбрасываем счетчик для ТЕКУЩЕГО канала
        if (tabId === 'messages') {

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
            updateTabCounter('users', allUsers.size); // <--- ДОБАВЬТЕ ЭТУ СТРОКУ
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
            const emptyStateKey = isPinnedMode ? 'pinned_messages_empty' : 'messages_empty';
            messageArea.innerHTML = `<div class="empty-state">${_chat(emptyStateKey)}</div>`;
            return;
        }
        
        messagesToDisplay.forEach(message => messageArea.appendChild(createMessageElement(message)));
        
        // Мгновенная прокрутка вниз
        messageArea.style.scrollBehavior = 'auto';
        scrollToBottom();
        setTimeout(() => { messageArea.style.scrollBehavior = 'smooth'; }, 100);

        // --- НАЧАЛО НОВОЙ "УМНОЙ" ЛОГИКИ ---

        // 1. Если старый "наблюдатель" еще работает, отключаем его
        if (lastMessageObserver) {
            lastMessageObserver.disconnect();
        }

        // 2. Находим самое последнее сообщение в чате
        const lastMessageElement = messageArea.lastElementChild;

        // 3. Проверяем, есть ли вообще что наблюдать и есть ли непрочитанные
        const unreadCountForChannel = unreadCounts.get(currentChannel) || 0;
        if (lastMessageElement && unreadCountForChannel > 0) {
            
            // 4. Создаем нового "наблюдателя"
            lastMessageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    // 5. Если последнее сообщение ПОЯВИЛОСЬ НА ЭКРАНЕ...
                    if (entry.isIntersecting) {
                        // ...обнуляем счетчик...
                        updateUnreadCount(currentChannel, 0, true);
                        console.log(`Счетчик для канала ${currentChannel} обнулен, т.к. пользователь увидел последнее сообщение.`);
                        
                        // ...и отключаем наблюдателя, его работа сделана.
                        observer.disconnect();
                    }
                });
            }, { threshold: 0.8 }); // Сработает, когда 80% сообщения видно

            // 6. Говорим наблюдателю начать следить за последним сообщением
            lastMessageObserver.observe(lastMessageElement);
        }
    }
    
    function loadQuestions() {
        if (!db || !currentUser) return;
        
        // Отписываемся от предыдущего слушателя вопросов, если он был
        if (questionsListener) {
            questionsListener();
        }

        try {
            // Присваиваем нового слушателя нашей переменной
            questionsListener = db.collection('questions')
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

        const timeString = msgDate.toLocaleTimeString(currentChatLang, {
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
            return `${_chat('smart_timestamp_yesterday')}, ${timeString}`;
        } else if (isThisYear) {
            const datePart = msgDate.toLocaleDateString(currentChatLang, {
                month: 'long',
                day: 'numeric'
            });
            return `${datePart}, ${timeString}`;
        } else {
            const fullDatePart = msgDate.toLocaleDateString(currentChatLang, {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
            return `${fullDatePart}, ${timeString}`;
        }
    }





    /**
     * Создает DOM-элемент для одного сообщения со всей логикой.
     * ВЕРСИЯ 3.0: Переход на data-атрибуты и делегирование событий.
     * @param {object} message - Объект сообщения из базы данных Firebase.
     * @returns {HTMLElement} - Готовый для вставки в DOM элемент сообщения.
     */
    function createMessageElement(message) {
        const messageEl = document.createElement('div');
        messageEl.id = `message-${message.id}`;
        messageEl.className = `message ${message.authorId === currentUser?.uid ? 'mine' : 'other'}`;
        
        if (message.authorId) {
            messageEl.dataset.authorId = message.authorId;
        }

        if (message.isPinned) messageEl.classList.add('pinned');

        const timestamp = message.createdAt;
        const displayTime = formatSmartTimestamp(timestamp);
        const fullTimeTitle = timestamp?.toDate?.().toLocaleString(currentChatLang, {year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'}) || '';
        
        let replyHTML = '';
        if (message.replyTo) {
            replyHTML = `<div class="reply-context" data-action="scroll-to" data-message-id="${message.replyTo.messageId}">
                            <div class="reply-author">${escapeHTML(message.replyTo.authorName || '')}</div>
                            <div class="reply-text">${escapeHTML(message.replyTo.textSnippet || '')}</div>
                        </div>`;
        }
        
        let contentHTML = '';
        if (message.type === 'file_share') {
            messageEl.classList.add('file-share-bubble');
            const qCount = message.fileInfo.questions;
            const qText = qCount === 1 ? _chat('file_share_question_1') : (qCount >= 2 && qCount <= 4 ? _chat('file_share_question_2_4') : _chat('file_share_question_5_more'));
            const currentChannelData = channels.find(c => c.id === currentChannel);
            const isTestingChannel = currentChannelData && currentChannelData.isForTesting;
            const resultsButtonHTML = isTestingChannel 
                ? `<div class="test-results-action"><button class="results-btn" data-action="show-results" data-file-id="${message.fileInfo.id}" data-channel-id="${message.channelId}">${_chat('results_button')}</button></div>` 
                : '';
            contentHTML = `<div class="file-share-content" data-action="show-file-actions" data-file-id="${message.fileInfo.id}" data-file-name="${escape(message.fileInfo.name)}" data-is-testing="${isTestingChannel}">
                                <div class="file-share-icon">📄</div>
                                <div class="file-share-details">
                                    <div class="file-share-name">${escapeHTML(message.fileInfo.name)}</div>
                                    <div class="file-share-info">${qCount} ${qText}</div>
                                </div>
                                <div class="file-share-arrow">→</div>
                           </div>${resultsButtonHTML}`;
        } else if (message.type === 'question_link') {
            messageEl.classList.add('question-link-bubble');
            contentHTML = `<div class="question-link-content" data-action="navigate-to-question" data-question-id="${message.questionId}" data-message-id="${message.id}">
                                <span class="question-link-icon">❓</span>
                                <div class="question-link-text"><strong>${_chat('new_question_notification')}</strong><p>${escapeHTML(message.text.substring(0, 80))}...</p></div>
                                <span class="question-link-arrow">→</span>
                           </div>`;
        } else {
            let messageText = message.text || '';
            let translatingClass = '';
            if (isChatTranslateModeEnabled && message.text) {
                const lang = localStorage.getItem('appLanguage') || 'ru';
                const cacheKey = getChatCacheKey(message.id, lang);
                if (chatTranslations.has(cacheKey)) {
                    messageText = chatTranslations.get(cacheKey);
                } else {
                    fetchAndCacheTranslation(message);
                    translatingClass = 'translating';
                }
            }
            const editedIndicator = message.editedAt ? `<span class="edited-indicator">${_chat('edited_indicator')}</span>` : '';
            const pinnedIcon = message.isPinned ? `<span class="pinned-icon" title="Закреплено">📌</span>` : '';
            contentHTML = `<div class="message-content ${translatingClass}">${pinnedIcon} ${escapeHTML(messageText.trim())} ${editedIndicator}</div>`;
        }
        
        let reactionsHTML = '<div class="reactions-container">';
        if (message.reactions) {
            Object.entries(message.reactions).forEach(([emoji, userIds]) => {
                if (userIds && userIds.length > 0) {
                    const isReactedByMe = userIds.includes(currentUser.uid);
                    reactionsHTML += `<button class="reaction-badge ${isReactedByMe ? 'mine' : ''}" data-action="toggle-reaction" data-emoji="${emoji}">${emoji} ${userIds.length}</button>`;
                }
            });
        }
        reactionsHTML += '</div>';

        let actionsHTML = `
            <button title="${_chat('tooltip_reply')}" data-action="reply">↩️</button>
            <button title="${_chat('tooltip_add_reaction')}" data-action="show-reaction-picker">😊</button>
            <button title="${message.isPinned ? _chat('tooltip_unpin') : _chat('tooltip_pin')}" data-action="toggle-pin">📌</button>
        `;
        const isAdmin = currentUser?.email === 'iverrum@gmail.com';
        
        // Кнопки редактирования и удаления показываются, если пользователь - автор ИЛИ администратор
        if ((message.authorId === currentUser?.uid || isAdmin) && message.type !== 'question_link') {
            actionsHTML += `<button title="${_chat('tooltip_edit_message')}" data-action="edit">✏️</button>`;
            actionsHTML += `<button title="${_chat('tooltip_delete_message')}" data-action="delete">🗑️</button>`;
        }

        messageEl.innerHTML = `<div class="message-header"><span class="author">${message.authorName || _chat('anonymous_user')}</span><span class="timestamp" title="${fullTimeTitle}">${displayTime}</span></div>${replyHTML}${contentHTML}${reactionsHTML}<div class="message-actions-toolbar">${actionsHTML}</div>`;
        
        // Сохраняем сырой текст для редактирования
        messageEl.dataset.rawText = message.text || '';

        const contentEl = messageEl.querySelector('.message-content');
        if (contentEl) {
            setTimeout(() => {
                const MAX_HEIGHT = 250;
                if (contentEl.scrollHeight > MAX_HEIGHT) {
                    contentEl.classList.add('collapsible');
                    const expandBtn = document.createElement('button');
                    expandBtn.className = 'expand-message-btn';
                    expandBtn.textContent = _chat('expand_message');
                    expandBtn.onclick = function() {
                        const isExpanded = contentEl.classList.toggle('expanded');
                        this.textContent = isExpanded ? _chat('collapse_message') : _chat('expand_message');
                    };
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

            if (newName && newName !== currentUser.displayName) {
                updatePromises.push(currentUser.updateProfile({ displayName: newName }));
            }

            if (newPassword) {
                if (newPassword.length < 6) {
                    showError(_chat('chat_profile_update_password_error'));
                    return;
                }
                updatePromises.push(currentUser.updatePassword(newPassword));
            }

            await Promise.all(updatePromises);
            alert(_chat('chat_profile_update_success'));
            updateUserUI();

            if (newName && newName !== currentUser.displayName) {
                updateAuthorNameInView(currentUser.uid, newName);
            }
            
            closeModal('profileEditModal');

        } catch (error) {
            console.error("Ошибка обновления профиля:", error);
            showError(`${_chat('chat_profile_update_fail_prefix')} ${getErrorMessage(error.code)}`);
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
                alert(_chat('chat_question_deleted_alert'));
                if (linkMessageId) {
                    await db.collection('messages').doc(linkMessageId).delete();
                }
            }
        } catch (error) {
            console.error("Ошибка при переходе к вопросу:", error);
            showError(_chat('chat_check_question_status_failed'));
        }
    }
    


    function displayQuestions(questions) {
        if (!messageArea) return;
        
        messageArea.innerHTML = '';
        
        if (questions.length === 0) {
            messageArea.innerHTML = `<div class="empty-state">${_chat('questions_empty')}</div>`;
            return;
        }
        
        questions.forEach(question => {
            const questionEl = createQuestionElement(question);

            const favButton = questionEl.querySelector('.add-to-favorites-btn');
            if (favButton) {
                const itemToSave = {
                    text: question.text,
                    options: question.options
                };
                favButton.onclick = () => ChatModule.addToFavorites(itemToSave, 'question');
            }

            const copyBtn = questionEl.querySelector('.copy-question-btn');
            if (copyBtn) {
                copyBtn.onclick = () => ChatModule.copyQuestionAsQst(question);
            }

            messageArea.appendChild(questionEl);
        });
    }




    function createQuestionElement(question) {
        const questionEl = document.createElement('div');
        questionEl.className = 'question-bubble';
        questionEl.id = `question-${question.id}`; 

        const timestamp = question.createdAt?.toDate?.() || new Date();
        const currentLocale = LOCALE_MAP[currentChatLang] || 'ru-RU'; // Получаем текущую локаль
        const timeStr = timestamp.toLocaleString(currentLocale); // Используем ее

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

        if (favoritesListener) {
            favoritesListener();
        }

        messageArea.innerHTML = `<div class="empty-state">${_chat('loading_messages')}</div>`;

        favoritesListener = db.collection('favorites')
            .where('userId', '==', currentUser.uid)
            .orderBy('createdAt', 'desc')
            .onSnapshot(snapshot => {
                const favoriteItems = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                
                if (favoriteItems.length === 0) {
                    messageArea.innerHTML = `<div class="empty-state">${_chat('chat_favorites_empty')}</div>`;
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
                        deleteButton.innerHTML = _chat('delete_favorite_button');
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
                messageArea.innerHTML = `<div class="empty-state">${_chat('chat_favorites_loading_error')}</div>`;
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
        document.getElementById('userActionsModalText').textContent = _chat('chat_user_actions_for').replace('{userName}', targetName);

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

            // ПРОВЕРКА: Убедимся, что и userData существует, и privateChatPartners является массивом
            if (userData && Array.isArray(userData.privateChatPartners)) {
                // Если все в порядке, используем стандартную логику
                if (!userData.privateChatPartners.includes(targetId)) {
                    await userDocRef.update({ privateChatPartners: firebase.firestore.FieldValue.arrayUnion(targetId) });
                }
            } else if (userData) {
                // Если пользователь есть, а поля с чатами нет - создаем его
                await userDocRef.update({ privateChatPartners: [targetId] });
            }
            
            // Мы НЕ ТРОГАЕМ документ собеседника, чтобы не нарушать права доступа.
            // Его список обновится, когда он сам зайдет в чат.
    
        } catch (error) {
            console.error("Ошибка при создании личного чата: ", error);
            showError("Не удалось начать личный чат.");
            return;
        }
        
        await loadPrivateChats(); 
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
                updateUnreadCount(currentChannel, 0, true);
                chatInput.value = '';
                chatInput.style.height = 'auto';
                cancelReply();
            }
        } catch (error) {
            console.error('Ошибка отправки сообщения:', error);
            showError(_chat('error_send_message_failed'));
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

    // Новый (исправленный) код
    async function saveMessageEdit() {
        const messageId = document.getElementById('editMessageIdInput').value;
        const newText = document.getElementById('editMessageInput').value.trim();
        if (!messageId || !newText) return;

        const messageRef = db.collection('messages').doc(messageId);
        try {
            const isAdmin = currentUser.email === 'iverrum@gmail.com';
            const doc = await messageRef.get();
            // Проверяем, существует ли сообщение, и является ли пользователь автором ИЛИ администратором
            if (doc.exists && (doc.data().authorId === currentUser.uid || isAdmin)) {
                await messageRef.update({
                    text: newText,
                    editedAt: firebase.firestore.FieldValue.serverTimestamp()
                });
                closeModal('editMessageModal');
            } else {
                throw new Error("Permission denied or message not found.");
            }
        } catch (error) {
            console.error('Ошибка редактирования сообщения:', error);
            showError(_chat('error_save_message_failed'));
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
            addButton.title = _chat('tooltip_choose_reaction');
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

        if (confirm(_chat('confirm_delete_message'))) {
            const messageRef = db.collection('messages').doc(messageId);
            try {
                const isAdmin = currentUser.email === 'iverrum@gmail.com';
                const doc = await messageRef.get();
                // Проверяем, существует ли сообщение, и является ли пользователь автором ИЛИ администратором
                if (doc.exists && (doc.data().authorId === currentUser.uid || isAdmin)) {
                    await messageRef.delete();
                } else {
                    throw new Error("Permission denied or message not found.");
                }
            } catch (error) {
                console.error('Ошибка удаления сообщения:', error);
                showError(_chat('error_delete_message_failed'));
            }
        }
    }
 
    async function deleteQuestion(questionId) {
        if (!currentUser || !db) return;

        if (confirm(_chat('confirm_delete_question'))) {
            const questionRef = db.collection('questions').doc(questionId);
            try {
                const isAdmin = currentUser.email === 'iverrum@gmail.com';
                const doc = await questionRef.get();
                if (doc.exists && (doc.data().authorId === currentUser.uid || isAdmin)) {
                    await questionRef.delete();
                } else {
                     throw new Error("Permission denied or question not found.");
                }
            } catch (error) {
                console.error('Ошибка удаления вопроса:', error);
                showError(_chat('error_delete_question_failed'));
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
            showError(_chat('question_format_unrecognized'));
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
             alert(`${_chat('questions_added_from_chat_success')} ${questionsToCreate.length}`);

        } catch (error) {
            console.error('Ошибка создания вопроса из сообщения:', error);
            showError(_chat('error_create_question_failed'));
        }
    }

    // --- ЗАМЕНИТЕ СТАРУЮ ФУНКЦИЮ НА ЭТУ ---
    async function createQuestion() {
        const rawText = document.getElementById('questionTextInput').value.trim();
        if (!rawText || !currentUser || !db) return;

        // Используем наш новый мощный парсер
        const questionsToCreate = parseMultipleQstBlocks(rawText);

        if (questionsToCreate.length === 0) {
            showError(_chat('error_question_parse_failed_detailed'));
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
            
            alert(`${_chat('questions_added_success')} ${questionsToCreate.length}`);
            document.getElementById('questionTextInput').value = '';
            closeModal('questionCreateModal');

        } catch (error) {
            console.error('Ошибка создания вопросов:', error);
            showError(_chat('error_create_question_failed'));
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
            showError(_chat('error_vote_failed'));
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
            showError(_chat('error_vote_favorite_failed') + " " + error);
        }
    }
        
    async function addToFavorites(itemObject, type) { 
        if (!currentUser || !db) {
            showError(_chat('add_to_favorites_auth_required'));
            openAuthModal(); 
            return;
        }
        try {
            // --- НАЧАЛО ИСПРАВЛЕНИЯ ---
            // Создаем объект, который будет сохранен в Firestore
            const favorite = {
                userId: currentUser.uid,
                content: itemObject, // Содержимое, которое пришло в функцию
                type: type,          // Тип элемента ('question')
                createdAt: firebase.firestore.FieldValue.serverTimestamp() // Время создания
            };
            // --- КОНЕЦ ИСПРАВЛЕНИЯ ---

            await db.collection('favorites').add(favorite); // Теперь используем созданный объект
            alert(_chat('add_to_favorites_success'));

        } catch (error) {
            console.error('Ошибка добавления в избранное:', error);
            showError(_chat('error_add_to_favorites_failed'));
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
            showError(_chat('error_remove_from_favorites_failed'));
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
        if (tabCounters['online']) tabCounters['online'].textContent = onlineUsers.size;

        if (onlineUsers.size === 0) {
            onlineUsersList.innerHTML = `<div style="padding: 10px; text-align: center; color: var(--secondary-text-color);">${_chat('chat_online_list_empty')}</div>`;
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

        const userData = userDoc.data();
        // ИСПРАВЛЕНИЕ: Сначала получаем данные пользователя, а потом безопасно берем поле.
        // Если поля privateChatPartners нет, partnerIds станет пустым массивом [].
        const partnerIds = userData?.privateChatPartners || []; 

        // --- НАЧАЛО НОВОГО КОДА ---

        // 1. Создаем массив промисов, чтобы для каждого партнера получить доп. информацию
        const privateChatsPromises = partnerIds.map(async (partnerId) => {
            // Получаем данные самого партнера (как и раньше)
            let partnerData = allUsers.get(partnerId);
            if (!partnerData) {
                const partnerDoc = await db.collection('users').doc(partnerId).get();
                if (partnerDoc.exists) partnerData = partnerDoc.data();
            }
            if (!partnerData) return null; // Если партнера не нашли, пропускаем

            // 2. Определяем ID личного чата
            const channelId = `private_${[currentUser.uid, partnerId].sort().join('_')}`;

            // 3. Находим ПОСЛЕДНЕЕ сообщение в этом чате, чтобы узнать его время
            const messagesQuery = await db.collection('messages')
                .where('channelId', '==', channelId)
                .orderBy('createdAt', 'desc')
                .limit(1)
                .get();

            let lastMessageTimestamp = null;
            if (!messagesQuery.empty) {
                // Если сообщения есть, берем время самого нового
                lastMessageTimestamp = messagesQuery.docs[0].data().createdAt;
            }

            // 4. Возвращаем объект, содержащий и данные партнера, и время последнего сообщения
            return { ...partnerData, lastMessageTimestamp };
        });

        // Ждем выполнения всех запросов
        let fetchedChats = await Promise.all(privateChatsPromises);

        // Отфильтровываем пустые результаты (если партнера не удалось найти)
        fetchedChats = fetchedChats.filter(chat => chat !== null);

        // 5. СОРТИРУЕМ чаты: у кого новее сообщение, тот выше
        fetchedChats.sort((a, b) => {
            const timeA = a.lastMessageTimestamp ? a.lastMessageTimestamp.toMillis() : 0;
            const timeB = b.lastMessageTimestamp ? b.lastMessageTimestamp.toMillis() : 0;
            return timeB - timeA; // Сортировка по убыванию (новое вверху)
        });

        privateChats = fetchedChats;

        // --- КОНЕЦ НОВОГО КОДА ---

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

        if (lastMessageObserver) lastMessageObserver.disconnect();

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
        membersList.innerHTML = `<li>${_chat('channel_members_loading')}</li>`; // Показываем индикатор загрузки

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
                                <button class="kick-btn" onclick="ChatModule.removeUserFromChannel('${channel.id}', '${memberId}')">${_chat('kick_user_button')}</button>
                            </li>`
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
        if (!confirm(_chat('chat_kick_user_confirm'))) return;
        try {
            const channelRef = db.collection('channels').doc(channelId);
            await channelRef.update({
                members: firebase.firestore.FieldValue.arrayRemove(userId)
            });
            
            await showChannelEditModal(channelId);
        } catch (error) {
            console.error("Ошибка удаления участника:", error);
            showError(_chat('chat_kick_user_fail'));
        }
    }


    async function saveChannelEdit() {
        const channelId = document.getElementById('editChannelId').value;
        const newName = document.getElementById('editChannelNameInput').value.trim();
        const newDesc = document.getElementById('editChannelDescInput').value.trim();
        const newPassword = document.getElementById('editChannelPasswordInput').value;

        if (!channelId || !newName) {
            alert(_chat('channel_name_empty'));
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
            alert(_chat('error_save_channel_failed'));
        }
    }




    async function deleteChannel() {
        const channelId = document.getElementById('editChannelId').value;
        if (!channelId) return;

        if (channelId === 'general') {
            alert(_chat('chat_cannot_delete_general_alert'));
            return;
        }

        if (confirm(_chat('confirm_delete_channel'))) {
            const channelRef = db.collection('channels').doc(channelId);
            try {
                const isAdmin = currentUser.email === 'iverrum@gmail.com';
                const doc = await channelRef.get();
                if (doc.exists && (doc.data().createdBy === currentUser.uid || isAdmin)) {
                    await channelRef.delete();
                    closeModal('channelEditModal');
                    if (currentChannel === channelId) {
                        const generalChannel = channels.find(c => c.id === 'general');
                        if(generalChannel) handleChannelClick(generalChannel);
                    }
                } else {
                    throw new Error("Permission denied or channel not found.");
                }
            } catch (error) {
                console.error("Ошибка удаления канала:", error);
                alert(_chat('chat_delete_channel_fail_alert'));
            }
        }
    }



    
    function createDefaultChannel() {
        if (!currentUser) return;
        
        db.collection('channels').doc('general').set({
            name: _chat('default_channel_name'),
            description: _chat('default_channel_desc'),
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
        // --- НАЧАЛО НОВОГО КОДА ---

        // Функция-помощник для входа в канал и добавления в участники
        const enterChannel = async () => {
            // РЕШЕНИЕ ПРОБЛЕМЫ №2: Добавляем пользователя в участники при входе
            // Проверяем, что это не основной канал и что пользователь еще не участник
            if (channel.id !== 'general' && (!channel.members || !channel.members.includes(currentUser.uid))) {
                try {
                    const channelRef = db.collection('channels').doc(channel.id);
                    await channelRef.update({
                        members: firebase.firestore.FieldValue.arrayUnion(currentUser.uid)
                    });
                    console.log(`Пользователь ${currentUser.displayName} добавлен в участники канала "${channel.name}"`);
                } catch (error) {
                    console.error("Ошибка добавления пользователя в участники:", error);
                }
            }
            // Переключаемся на канал
            switchToChannel(channel.id, channel.name, 'public');
        };

        // Если канал защищен паролем
        if (channel.hasPassword) {
            // РЕШЕНИЕ ПРОБЛЕМЫ №1: Проверяем, является ли пользователь все еще участником
            const isMember = channel.members && channel.members.includes(currentUser.uid);

            // Если пользователь НЕ участник (или списка участников нет), то ключ недействителен
            if (!isMember) {
                // Если он был удален, но ключ остался в браузере - аннулируем ключ
                if (unlockedChannels.has(channel.id)) {
                    unlockedChannels.delete(channel.id);
                    localStorage.setItem(`unlockedChannels_${currentUser.uid}`, JSON.stringify(Array.from(unlockedChannels)));
                    console.log(`Локальный ключ для канала "${channel.name}" аннулирован, так как пользователь был удален.`);
                }
            }

            // Теперь стандартная проверка: если канал все еще не разблокирован, запрашиваем пароль
            if (!unlockedChannels.has(channel.id)) {
                            const password = prompt(_chatFormat('channel_enter_password_prompt', {
                                channelName: channel.name
                            }));
                if (password === null) return;

                const enteredPasswordHash = await hashPassword(password);
                if (enteredPasswordHash === channel.passwordHash) {
                    // Если пароль верный, разблокируем и входим
                    unlockedChannels.add(channel.id);
                    localStorage.setItem(`unlockedChannels_${currentUser.uid}`, JSON.stringify(Array.from(unlockedChannels)));
                    await enterChannel();
                } else {
                    alert(_chat('invalid_channel_password'));
                }
            } else {
                // Если ключ есть и он действителен (пользователь все еще участник), просто входим
                await enterChannel();
            }
        } else {
            // Если канал публичный (без пароля), просто входим
            await enterChannel();
        }
        // --- КОНЕЦ НОВОГО КОДА ---
    }
    

    async function createChannel() {
        const name = document.getElementById('channelNameInput').value.trim();
        const description = document.getElementById('channelDescInput').value.trim();
        const password = document.getElementById('channelPasswordInput').value;
        const isForTesting = document.getElementById('channelIsForTesting').checked;
        
        if (!name) {
            alert(_chat('chat_channel_name_empty_alert'));
            return;
        }

        const passwordHash = await hashPassword(password);
        
        try {
            await db.collection('channels').add({
                name: name,
                description: description,
                createdBy: currentUser.uid,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                hasPassword: !!password,
                passwordHash: passwordHash,
                isForTesting: isForTesting
            });
            
            closeModal('channelCreateModal');
            document.getElementById('channelNameInput').value = '';
            document.getElementById('channelDescInput').value = '';
            document.getElementById('channelPasswordInput').value = '';
            document.getElementById('channelIsForTesting').checked = false;
        } catch (error) {
            console.error('Ошибка создания канала:', error);
            showError(_chat('chat_create_channel_fail_alert'));
        }
    }



    // ========== UI HELPERS ==========
    function showModal(modalId) {
        document.getElementById(modalId)?.classList.remove('hidden');
    }
    
    function closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('hidden');
        }

        // --- НАЧАЛО ИСПРАВЛЕНИЯ ---
        // Если закрывается именно окно с объяснением ИИ,
        // убираем класс, блокирующий прокрутку.
        if (modalId === 'aiExplanationModal') {
            document.body.classList.remove('chat-open');
        }
        // --- КОНЕЦ ИСПРАВЛЕНИЯ ---
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
        if (messageArea) messageArea.innerHTML = `<div class="empty-state">${_chat('auth_required_to_view')}</div>`;
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

        if (!confirm(_chat('confirm_delete_account'))) {
            return;
        }

        const password = prompt(_chat('reauth_prompt'));
        if (password === null || password === "") {
            alert(_chat('reauth_cancelled'));
            return;
        }

        console.log(`Начало удаления аккаунта для пользователя ${currentUser.uid}`);
        const deleteButton = document.getElementById('deleteAccountBtn');
        if (deleteButton) {
            deleteButton.disabled = true;
            deleteButton.textContent = _chat('deleting_account_status');
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

            alert(_chat('delete_account_success'));
            
            ChatModule.closeModal('profileEditModal');
            ChatModule.closeChatModal();

        } catch (error) {
            console.error("Ошибка удаления аккаунта:", error);
            let errorMessage = _chat('error_generic');
            
            if (error.code === 'auth/wrong-password') {
                errorMessage = _chat('reauth_wrong_password');
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
            alert(_chat('error_upload_file_type'));
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
                            throw new Error(fileData.error || _chat('error_fetch_file_id_failed'));
                        }
                    } catch(error) {
                        console.error("Ошибка получения ID файла: ", error);
                        showError(_chat('error_upload_failed'));
                    } finally {
                        // Возвращаем кнопку в нормальное состояние
                        sendBtn.disabled = false;
                        sendBtn.classList.remove('loading');
                        sendBtn.innerHTML = '➤';
                    }
                }, 2000); // Даем серверу время на обработку

            } catch (error) {
                console.error('Ошибка при обработке файла чата:', error);
                showError(_chat('error_file_process_failed'));
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


// script.js

    function showFileActionsModal(fileId, fileName, isTestingChannel = false) {
        document.getElementById('fileActionsModalTitle').textContent = `${_chat('file_actions_modal_title')} ${decodeURIComponent(fileName)}`;

        const downloadBtn = document.getElementById('fileActionDownloadBtn');
        const testBtn = document.getElementById('fileActionTestBtn');
        const modalButtonsContainer = testBtn.parentElement;
        const closeBtn = modalButtonsContainer.querySelector('button[onclick*="closeModal"]');

        // Удаляем динамически созданную кнопку, если она осталась с прошлого раза
        const oldPracticeBtn = document.getElementById('fileActionPracticeTestBtn');
        if (oldPracticeBtn) {
            oldPracticeBtn.remove();
        }

        // Сбрасываем порядок кнопок по умолчанию (на случай если он был изменен)
        modalButtonsContainer.insertBefore(downloadBtn, closeBtn);
        modalButtonsContainer.insertBefore(testBtn, closeBtn);


        if (isTestingChannel) {
            // --- НОВАЯ ЛОГИКА ДЛЯ КАНАЛОВ ТЕСТИРОВАНИЯ ---
            
            // 1. Создаем кнопку "Пробный тест"
            const practiceTestBtn = document.createElement('button');
            practiceTestBtn.id = 'fileActionPracticeTestBtn';
            practiceTestBtn.textContent = _chat('practice_test_button');
            practiceTestBtn.onclick = () => startTestFromShare(fileId, fileName, { isPractice: true });

            // 2. Настраиваем кнопку "Пройти тест" (основная)
            testBtn.textContent = _chat('official_test_button'); // Используем новый ключ без скобок
            testBtn.onclick = () => startTestFromShare(fileId, fileName, { isPractice: false });

            // 3. Устанавливаем ПРАВИЛЬНЫЙ ПОРЯДОК:
            // Вставляем "Пройти тест" перед кнопкой "Отмена"
            modalButtonsContainer.insertBefore(testBtn, closeBtn); 
            // Вставляем "Пробный тест" после "Пройти тест"
            modalButtonsContainer.insertBefore(practiceTestBtn, closeBtn);
            // Вставляем "Скачать" после "Пробного теста"
            modalButtonsContainer.insertBefore(downloadBtn, closeBtn);

        } else {
            // --- ЛОГИКА ДЛЯ ОБЫЧНЫХ КАНАЛОВ ---
            // ИЗМЕНЕНИЕ: Используем более общий ключ 'file_actions_test' вместо 'practice_test_button'
            testBtn.textContent = _chat('file_actions_test'); 
            testBtn.onclick = () => startTestFromShare(fileId, fileName, { isPractice: true });
        }
        
        downloadBtn.onclick = () => downloadSharedFile(fileId, fileName);
        
        showModal('fileActionsModal');
    }



    async function downloadSharedFile(fileId, fileName) {
        try {
            closeModal('fileActionsModal');
            const url = `${googleAppScriptUrl}?action=getChatFileContent&fileId=${fileId}`;
            const response = await fetch(url);
            const data = await response.json();
            if (!data.success) throw new Error(data.error);

            await window.mainApp.downloadOrShareFile(fileName, data.content, 'text/plain;charset=utf-8', _chat('share_title_generic_file'));
        } catch (error) {
            console.error('Ошибка скачивания файла из чата:', error);
            alert(_chat('chat_file_download_failed').replace('{error}', error.message));
        }
    }



    async function startTestFromShare(fileId, fileName, options = { isPractice: true }) {
         try {
            closeModal('fileActionsModal');
            ChatModule.closeChatModal();

            window.mainApp.showGlobalLoader(`${_chat('global_loader_loading_test')} "${decodeURIComponent(fileName)}"...`);

            const url = `${googleAppScriptUrl}?action=getChatFileContent&fileId=${fileId}`;
            const response = await fetch(url);
            const data = await response.json();
            if (!data.success) throw new Error(data.error);
            
            // --- НОВЫЙ КОД ---
            // Сохраняем контекст для записи результатов
            const quizContext = {
                fileId: fileId,
                channelId: currentChannel,
                isPractice: options.isPractice
            };
            // Передаем контекст и режим в следующую функцию
            window.mainApp.processFile(decodeURIComponent(fileName), data.content, quizContext);
            // --- КОНЕЦ НОВОГО КОДА ---

        } catch (error) {
            console.error('Ошибка запуска теста из чата:', error);
            window.mainApp.hideGlobalLoader();
            alert(_chat('error_start_test_failed').replace('{error}', error.message));
        }
    }



    // ИСПРАВЛЕННЫЙ КОД
    async function uploadFileToServer(fileName, fileContent, url) {
        if (!fileName || !fileContent) {
            console.warn("Попытка загрузить пустой файл. Отменено.");
            return;
        }
        if (!url) {
            console.error("URL для загрузки не предоставлен. Загрузка отменена.");
            return;
        }

        console.log(`Подготовка файла "${fileName}" `);

        try {
            const payload = {
                action: 'saveToArchive', // <-- ДОБАВЬТЕ ЭТУ СТРОКУ
                fileName: fileName,
                content: fileContent,
                isQstValid: true
            };

            const response = await fetch(url, {
                method: 'POST',
                mode: 'no-cors',
                cache: 'no-cache',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            console.log("Файл успешно обработан");

        } catch (error) {
            console.error("Ошибка при загрузке файла:", error);
        }
    }




    function toggleNotifications() {
        notificationsEnabled = !notificationsEnabled;

        const notificationBtn = document.getElementById('notificationToggle');
        if (notificationBtn) {
            notificationBtn.classList.toggle('active', notificationsEnabled);
            notificationBtn.title = notificationsEnabled ? _chat('notifications_title_enabled') : _chat('notifications_title_disabled');
        }

        alert(notificationsEnabled ? _chat('notifications_enabled') : _chat('notifications_disabled'));
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
                document.title = `(${unreadMessageCount}) ${_chat('notification_new_message')}`;
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
            showError(_chat('error_pin_message_failed'));
        }
    }

    function togglePinnedModeView() {
        isPinnedMode = !isPinnedMode;
        
        const toggleBtn = document.getElementById('togglePinnedBtn');
        if (toggleBtn) {
            toggleBtn.classList.toggle('active', isPinnedMode);
            toggleBtn.title = isPinnedMode ? _chat('chat_show_all_messages') : _chat('chat_show_pinned_messages');
        }

        displayMessages();
    }




    /**
     * НОВАЯ ФУНКЦИЯ
     * Переключает режим перевода чата и перерисовывает сообщения.
     */
    function toggleChatTranslation() {
        isChatTranslateModeEnabled = !isChatTranslateModeEnabled;
        const toggleBtn = getEl('chatTranslateBtn');
        if (toggleBtn) {
            toggleBtn.classList.toggle('active', isChatTranslateModeEnabled);
            toggleBtn.title = isChatTranslateModeEnabled 
                ? _chat('chat_translate_button_title_on') 
                : _chat('chat_translate_button_title_off');
        }
        // Принудительно перерисовываем все видимые сообщения
        displayMessages();
    }


    async function fetchAndCacheTranslation(message) {
        if (!message.text || !message.text.trim()) return;

        const lang = localStorage.getItem('appLanguage') || 'ru';
        
        // ИСПОЛЬЗУЕМ НОВУЮ ВНУТРЕННЮЮ ФУНКЦИЮ
        const cacheKey = getChatCacheKey(message.id, lang);
        
        try {
            const response = await fetch(googleAppScriptUrl, {
                method: 'POST',
                body: JSON.stringify({
                    action: 'translateText',
                    text: message.text,
                    targetLang: lang
                })
            });
            const result = await response.json();
            if (result.success) {
                // Сохраняем в кэш с правильным ключом
                chatTranslations.set(cacheKey, result.translatedText);
                
                const messageEl = getEl(`message-${message.id}`);
                const contentEl = messageEl?.querySelector('.message-content');
                if (contentEl) {
                    // 1. Сначала убираем класс "моргания".
                    // Это остановит анимацию "Я работаю..."
                    contentEl.classList.remove('translating');

                    // 2. Вызываем "умную" анимацию трансформации текста из mainApp.
                    //    Это запустит анимацию "Вот результат!".
                    //    message.text - это оригинальный текст.
                    //    result.translatedText - это текст, полученный от сервера.
                    await window.mainApp.animateTextTransformation(contentEl, message.text, result.translatedText);
                }
            } else {
                throw new Error(result.error);
            }

        } catch (error) {
            console.error(`Ошибка перевода сообщения ${message.id}:`, error);
            chatTranslations.set(cacheKey, _chat('chat_translation_failed'));
            const messageEl = getEl(`message-${message.id}`);
            const contentEl = messageEl?.querySelector('.message-content');
            if (contentEl) {
                contentEl.textContent = _chat('chat_translation_failed');
                contentEl.classList.add('translation-error');
                contentEl.classList.remove('translating');
            }
        }
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
            alert(_chat('error_download_auth_required'));
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
                        return `${_chat('download_file_question_label')}: ${item.text}\n${_chat('download_file_answer_label')}: ${correctAnswer}\n`;
                    } else {
                        return `${_chat('download_file_message_label')}: ${item.text}\n`;
                    }
                }).join('----------------------------------\n');
            }



            const fullFileName = `${fileName}.${format}`;
            const shareTitle = dataType === 'favorites' ? _chat('share_title_favorites') : _chat('share_title_questions');
            
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
                    alert(_chat('error_download_system_unavailable'));
                }
            }

        } catch (error) {
            console.error(`Ошибка скачивания для ${dataType}:`, error);
            alert(_chat('error_download_failed'));
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
                alert(_chat('chat_favorites_empty_to_clear'));
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
            showError(_chat('error_clear_favorites_failed'));
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
            await window.mainApp.copyToClipboardMain(qstContent);
            // Уведомление для пользователя уже встроено в copyToClipboardMain
        } catch (error) {
            console.error('Ошибка копирования вопроса:', error);
            alert(_chat('error_copy_question_failed'));
        }
    }


    function showAISummaryModal(title, content) {
        getEl('aiSummaryModalTitle').textContent = title;
        const outputEl = getEl('aiSummaryOutput');

        // Используем библиотеку marked для красивого форматирования
        if (window.marked) {
            outputEl.innerHTML = marked.parse(content);
        } else {
            outputEl.textContent = content;
        }
        
        showModal('aiSummaryModal');
    }



    async function showTestResults(fileId, channelId) {
        const modalTitle = document.getElementById('testResultsModalTitle');
        const tableContainer = document.getElementById('testResultsTableContainer');
        
        // Используем ключ перевода для заголовка
        modalTitle.textContent = _chat('results_modal_title');
        
        // ИСПРАВЛЕНИЕ №1: Используем правильный ключ для "Загрузки"
        tableContainer.innerHTML = `<div class="loading-placeholder">${_chat('loading_messages')}</div>`;
        showModal('testResultsModal');

        try {
            const querySnapshot = await db.collection('testResults')
                .where('fileId', '==', fileId)
                .where('channelId', '==', channelId)
                .orderBy('accuracy', 'desc')
                .get();
                
            if (querySnapshot.empty) {
                // Используем ключ перевода для пустого состояния
                tableContainer.innerHTML = `<div class="results-empty-state">${_chat('chat_test_results_empty')}</div>`;
                return;
            }
            
            // ИСПРАВЛЕНИЕ №2: Собираем таблицу с правильными ключами для заголовков
            let tableHTML = `
                <table>
                    <thead>
                        <tr>                      
                            <th>${_chat('results_table_header_num')}</th>
                            <th>${_chat('results_table_header_user')}</th>
                            <th>${_chat('results_table_header_accuracy')}</th>
                            <th>${_chat('results_table_header_time')}</th>
                        </tr>
                    </thead>
                    <tbody>
            `;

            querySnapshot.docs.forEach((doc, index) => {
                const result = doc.data();
                const time = result.timeSpentSeconds;
                const minutes = Math.floor(time / 60);
                const seconds = time % 60;
                const timeFormatted = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
                
                tableHTML += `
                    <tr>
                        <td>${index + 1}</td>
                        <td>${escapeHTML(result.userName || _chat('anonymous_user'))}</td>
                        <td>${result.accuracy.toFixed(1)}%</td>
                        <td>${timeFormatted}</td>
                    </tr>
                `;
            });
            
            tableHTML += `</tbody></table>`;
            tableContainer.innerHTML = tableHTML;

        } catch (error) {
            console.error("Ошибка загрузки результатов теста:", error);
            // Используем ключ перевода для сообщения об ошибке
            tableContainer.innerHTML = `<div class="results-empty-state">${_chat('chat_test_results_loading_error')} ${error.message}</div>`;
        }
    }


    function formatMessagesForAI(messages) {
        // Превращаем массив объектов сообщений в простой текстовый формат
        return messages.map(msg => {
            const author = msg.authorName || 'Пользователь';
            const text = msg.text || '';
            // Пропускаем системные сообщения и ссылки на вопросы
            if (msg.type === 'question_link' || msg.type === 'file_share') return '';
            return `${author}: ${text}`;
        }).filter(Boolean).join('\n'); // Убираем пустые строки и соединяем
    }

    async function getAIChatSummary(summaryType, providedMessages = null) {
        let messagesToProcess = [];

        // Сценарий 1: Нам предоставили конкретный срез сообщений (из режима выбора)
        if (providedMessages) {
            messagesToProcess = providedMessages;
        } 
        // Сценарий 2: Нам нужно взять все сообщения из текущего канала
        else { 
            if (allMessages.length === 0) {
                // ИЗМЕНЕНИЕ: Используем систему переводов
                alert(_chat('chat_analyze_no_messages'));
                return;
            }
            messagesToProcess = allMessages;
        }

        // Превращаем массив объектов в единый текст для отправки ИИ
        const messagesText = formatMessagesForAI(messagesToProcess);
        if (!messagesText) {
            // ИЗМЕНЕНИЕ: Используем систему переводов
            alert(_chat('chat_analyze_no_valid_messages'));
            return;
        }
        
        // ИЗМЕНЕНИЕ: Используем систему переводов
        mainApp.showGlobalLoader(_chat('ai_analyzing_chat'));

        try {
            // Отправляем запрос на наш серверный скрипт
            const response = await fetch(googleAppScriptUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'text/plain' },
                body: JSON.stringify({
                    action: 'getChatSummary',
                    messagesText: messagesText,
                    summaryType: summaryType.replace('summarize-', ''),
                    targetLanguage: currentChatLang
                })
            });

            const result = await response.json();

            if (result.success && result.summary) {
                // Определяем правильный заголовок для модального окна
                let titleKey;
                if (summaryType === 'summarize-all') {
                    titleKey = 'ai_summary_title_all';
                } else { // Для 'summarize-from-selection'
                    titleKey = 'ai_summary_title_selection';
                }
                
                showAISummaryModal(_chat(titleKey), result.summary);
            } else {
                // ИЗМЕНЕНИЕ: Используем систему переводов
                throw new Error(result.error || _chat('ai_error_summary_generic'));
            }

        } catch (error) {
            console.error("Ошибка при получении сводки от ИИ:", error);
            
            let userFriendlyError;
            if (error.message.includes("INTERNAL") || error.message.includes("HTTP 500")) {
                userFriendlyError = _chat('ai_error_summary_server');
            } else {
                userFriendlyError = _chat('ai_error_summary_generic');
            }
            alert(userFriendlyError);
        } finally {
            mainApp.hideGlobalLoader();
        }
    }


    function startAiSummarySelection() {
        if (allMessages.length === 0) {
            alert("В этом канале еще нет сообщений для выбора.");
            return;
        }
        isAiSelectionMode = true;
        getEl('aiSelectionBanner').classList.remove('hidden');
        getEl('messageArea').classList.add('selection-mode');
        
        // --- НАЧАЛО НОВОГО КОДА: "Умная" отмотка назад ---
        // Вычисляем, на сколько нужно прокрутить вверх (на 80% высоты видимого окна)
        const scrollUpAmount = messageArea.clientHeight * 0.8;
        
        // Вычисляем новую позицию скролла
        let targetScrollTop = messageArea.scrollTop - scrollUpAmount;
        
        // Убеждаемся, что мы не ушли в отрицательные значения
        if (targetScrollTop < 0) {
            targetScrollTop = 0;
        }

        // Плавно прокручиваем к новой позиции
        messageArea.scrollTo({
            top: targetScrollTop,
            behavior: 'smooth'
        });
        // --- КОНЕЦ НОВОГО КОДА ---
    }

    function cancelAiSummarySelection() {
        isAiSelectionMode = false;
        getEl('aiSelectionBanner').classList.add('hidden');
        getEl('messageArea').classList.remove('selection-mode');
    }



    function handleAiMessageSelection(event) {
        // Функция сработает только если мы в режиме выбора
        if (!isAiSelectionMode) return;

        const messageElement = event.target.closest('.message');
        if (!messageElement) return;

        const messageId = messageElement.id.replace('message-', '');
        
        // Находим индекс выбранного сообщения в нашем массиве
        const startIndex = allMessages.findIndex(msg => msg.id === messageId);

        if (startIndex > -1) {
            // "Отрезаем" все сообщения, начиная с выбранного
            const messagesToProcess = allMessages.slice(startIndex);
            // Вызываем нашу основную функцию, но уже с подготовленным срезом
            getAIChatSummary('selection', messagesToProcess);
        } else {
            alert("Не удалось найти выбранное сообщение. Попробуйте еще раз.");
        }

        // Вне зависимости от результата, выходим из режима выбора
        cancelAiSummarySelection();
    }


    async function handlePasswordReset() {
        if (!auth) {
            showError(_chat('auth_system_unavailable'));
            return;
        }

        const emailInput = getEl('resetEmailInput');
        const email = emailInput.value.trim();

        if (!email) {
            showError(_chat('fill_all_fields'));
            return;
        }

        try {
            await auth.sendPasswordResetEmail(email);
            closeModal('forgotPasswordModal');
            emailInput.value = ''; // Очищаем поле после отправки
            alert(_chat('password_reset_email_sent'));
        } catch (error) {
            console.error("Ошибка сброса пароля:", error);
            if (error.code === 'auth/user-not-found') {
                showError(_chat('error_user_not_found_for_reset'));
            } else {
                showError(getErrorMessage(error.code));
            }
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

            document.body.classList.add('chat-open');
            
            // Просто показываем чат. Текст в нем уже будет на правильном языке.
            chatOverlay.classList.remove('hidden');

            // Ключевое исправление: Загружаем данные для текущей вкладки КАЖДЫЙ РАЗ при открытии.
            // Это гарантирует, что сообщения отобразятся, даже если они загрузились в фоне.
            loadTabData(currentTab); 
            if (window.mainApp) window.mainApp.manageBackButtonInterceptor();

        },

        showTestResults,

        closeChatModal: () => {
            if (chatOverlay) {
                document.body.classList.remove('chat-open');
                chatOverlay.classList.add('hidden');
            }
            if (window.mainApp) window.mainApp.manageBackButtonInterceptor();
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
        

        /**
         * Устанавливает язык для модуля чата и немедленно обновляет его UI,
         * даже если он скрыт.
         * @param {string} lang - Код языка ('ru' или 'en').
         */
        setLanguage: (lang) => {
            if (LANG_PACK_CHAT[lang]) {
                currentChatLang = lang;
                localStorage.setItem('chatLanguage', lang);
                updateChatUIText();

                // === НАЧАЛО НОВОГО КОДА: Мгновенный перевод ===
                // Если открыт чат и активна вкладка сообщений,
                // перерисовываем их, чтобы применился новый язык.
                if (chatOverlay && !chatOverlay.classList.contains('hidden') && currentTab === 'messages') {
                    displayMessages();
                }
                // 
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
        showModal: showModal, 
        handlePasswordReset,
        closeModal: closeModal,
        
        // Getters
        isInitialized: () => isInitialized,
        getCurrentUser: () => currentUser,
        getCurrentTab: () => currentTab
    };
})();



// Обновляем ссылки для совместимости
window.ChatModule = ChatModule;










const googleAppScriptUrl = 'https://script.google.com/macros/s/AKfycbyBtPbM0J91gDiuj4Ha-gTLesCMI8gSqMC3D0GYbGZ0YHIsP2mvu5ePmiftA03GLso/exec';



























// ============================================
// ОСНОВНОЙ СКРИПТ ПРИЛОЖЕНИЯ
// ============================================    

const mainApp = (function() {
    'use strict';


    const THEMES = {
        'glass-dark': { name: 'Стекло (тёмная)', icon: '🔮' },
        'synthwave-mode':  { name: 'Неон', icon: '🔭' },
        'dark-mode':       { name: 'Тёмная', icon: '🌙' },
        'claude-mode':     { name: 'Claude', icon: '🌤️' },
        'light':      { name: 'Светлая', icon: '☀️' }
    };

    let backButtonPressedOnce = false;

    // --- НАЧАЛО ИСПРАВЛЕНИЙ ---

    // 1. Создаём единый объект для языков, доступный для всего модуля.
    const SUPPORTED_LANGS = {
        ru: 'Ру',
        en: 'En',
        kk: 'Қаз'
    };
    // Создаём единый массив для порядка переключения.
    const LANG_CYCLE = ['ru', 'en', 'kk'];

    // --- КОНЕЦ ИСПРАВЛЕНИЙ ---
// --- СЛОВАРЬ ПЕРЕВОДОВ ---
    const LANG_PACK = {
        ru: {
            // Главный экран
            exit_toast_text: 'Нажмите еще раз для выхода',
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
            feedback_mode: 'Режим обратной связи (🤖ИИ анализ + пройти неверные)',
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
            chat_button_title: '💬',
            quick_mode_title: 'Быстрый режим (Автопереход)',
            trigger_words_title: 'Триггер-слова',
            theme_button_title: '🌗',
            language_toggle_title: 'Сменить язык',
            favorite_button_title: 'Добавить в избранное',
            translate_question_title: 'Перевести текущий вопрос',
            // Сообщения (ДОБАВЛЕНО)
            search_query_too_short: 'Поисковый запрос должен содержать минимум 3 символа.',
            file_empty_or_invalid_part1: 'Файл "',
            file_empty_or_invalid_part2: '" пуст или имеет неверный формат.',
            no_questions_for_settings: 'Нет вопросов для теста с текущими настройками.',
            confirm_finish_early: 'Вы уверены, что хотите завершить тест досрочно?',
            copy_button: "Копировать",
            search_provider_db: "База данных",
            relevance_tag: "Релевантность:",
            copy_button: "Копировать",
            copy_question_tooltip: "Копировать вопрос",
            favorite_question_tooltip: "Добавить в избранное",

            ai_explanation_title: '💡 Объяснение от ИИ',
            ai_explanation_style_label: 'Стиль объяснения:',
            ai_explain_button: 'Объяснить💡',
            ai_explanation_loading: 'ИИ готовит объяснение...',

            ai_generating_button: '🤖 Генерация...',
            ai_error_text_empty: 'Пожалуйста, вставьте текст для анализа.',
            ai_error_generation: 'Произошла ошибка при генерации теста.',
            ai_question_count_label: '4. Укажите количество вопросов для ИИ:',
            ai_auto_mode_label: 'Авто',
            ai_style_simple: "Просто",
            ai_style_scientific: "Научно",
            ai_style_associative: "Аналогия",
            ai_style_stepbystep: "Пошагово",
            ai_style_practical: "Практично",
            ai_style_visual: "Наглядно",
            ai_answer_count_label: '5. Укажите количество вариантов ответа:', 
            ai_auto_category_label: 'Автоматически создавать категории', 
            exit_modal_title: 'Подтверждение',
            exit_modal_text: 'Вы уверены, что хотите выйти из приложения?',
            exit_modal_confirm: 'Выйти',
            exit_modal_cancel: 'Остаться',
            update_available_text: 'Доступна новая версия!',
            update_button_text: 'Обновить',
            ai_explain_button_title: 'Объяснить с помощью ИИ',
            download_translated_txt_button: 'Скачать перевод ({lang})(txt)',
            download_translated_qst_button: 'Скачать перевод ({lang})(qst)',
            no_translations_to_download: 'Нет доступных переводов для скачивания.',
            error_creating_translation_file: 'Не удалось создать файл перевода.',
            ai_show_original_button: 'Показать оригинал',
            ai_show_translation_button: 'Показать перевод',
            flashcards_mode: 'Режим карточек (вопрос/ответ)',
            start_flashcards_button: 'Начать изучение',
            flashcard_category_label: 'Следующий раздел:',
            results_flashcards_viewed: 'Просмотрено карточек',
            session_cards_viewed: 'Просмотрено',
            ai_error_generic: 'Не удалось сгенерировать объяснение. Попробуйте, пожалуйста, еще раз.',
            ai_error_server: 'Не удалось сгенерировать объяснение: Произошла временная ошибка на сервере. Пожалуйста, повторите попытку позже.',
            parser_overwrite_warning: 'Поле с результатом уже содержит текст. Вы уверены, что хотите перезаписать его?',
            ai_error_generation: 'Произошла ошибка при генерации теста.',
            ai_error_server_generation: 'Ошибка генерации теста: Произошла временная ошибка на сервере. Пожалуйста, повторите попытку позже.',
            ai_char_limit_exceeded: 'Лимит символов превышен ({current}/{max})',

            tab_converter: "Конвертер из текста",
            tab_ai_generator: "ИИ-генератор по теме",
            ai_from_text_title: "🤖 Создать тест из вашего текста (ИИ)",
            ai_generate_from_text_button: "Сгенерировать тест из текста",
            ai_topic_description: "ИИ самостоятельно создаст тест на основе указанной темы, используя свои знания.",
            ai_topic_label: "1. Введите тему для генерации теста:",
            ai_topic_placeholder: "Пример: История Древнего Рима в период Республики, 15 вопросов, 4 варианта ответа, с категориями по войнам...",
            ai_topic_question_count_label: "2. Количество вопросов (если не указано в теме):",
            ai_topic_answer_count_label: "3. Количество вариантов ответа (если не указано в теме):",
            ai_generate_from_topic_button: "🤖 Создать тест по теме (ИИ)",
            ai_thinking_topic: "ИИ-генератор размышляет над вашей темой...",
            ai_topic_auto_category_label: "4. Автоматически создавать категории",
            parser_auto_detect: '-- Автоматическое определение --',
            filter_variants_button: '⚙️ Фильтр по вариантам',
            filter_variants_header: 'Выберите кол-во вариантов:',
            filter_apply_button: 'Применить',
            filter_reset_button: 'Сброс',
            loading_default_text: 'Загрузка...',
            search_no_results: 'По вашему запросу ничего не найдено.',
            search_error_prefix: 'Произошла ошибка:',
            gradus_loading: 'Загрузка...',
            gradus_folder_empty: 'Папка пуста',
            gradus_loading_error_prefix: 'Ошибка:',
            gradus_loading_quiz_prefix: 'Загрузка теста',
            error_no_questions_for_cheatsheet: 'Нет вопросов для генерации шпоры.',
            parser_input_empty_alert: 'Поле для ввода текста пустое!',
            parser_pattern_not_found_alert: 'Произошла ошибка. Выбранный паттерн не найден.',
            parser_no_questions_recognized_alert: 'Не удалось найти ни одного вопроса по выбранному формату. Попробуйте другой.',
            parser_no_questions_with_errors_alert: 'Не удалось распознать ни одного вопроса. Обнаружено ошибок: {count}.',
            parser_conversion_success_alert: 'Успешно сконвертировано {count} вопросов!',
            parser_conversion_summary_alert: 'Операция завершена.\n\nРаспознано вопросов: {parsed}\nОбнаружено ошибок форматирования: {errors}',
            ai_topic_empty_alert: 'Пожалуйста, введите тему для генерации теста.',
            ai_explanation_prepare_error: 'Не удалось подготовить окно объяснения.',
            ai_analyzing_errors_button: 'ИИ анализирует... 🧠', 
            ai_error_analysis_button: '🤖 Аналитика ошибок от ИИ',
            search_engine_google: 'Google',
            search_engine_yandex: 'Яндекс',
            search_engine_perplexity: 'Perplexity',
            footer_copyright: 'prod by @iverrum',
            error_no_question_to_copy: 'Не удалось определить текущий вопрос для копирования.',
            error_no_question_to_favorite: 'Не удалось определить текущий вопрос для добавления в избранное.',
            error_favorites_require_auth: 'Для использования избранного необходимо войти в аккаунт.',
            error_cannot_process_question: 'Не удалось обработать вопрос для сохранения.',
            app_title: 'QSTiUM',
            confirm_delete_session: 'Вы уверены, что хотите удалить сохраненный тест "{fileName}"? Это действие необратимо.',
            error_session_not_found: 'Ошибка: сохраненная сессия для этого файла не найдена.',
            error_session_file_not_found: 'Не удалось восстановить сессию. Исходный файл не найден в "Недавно использованных".',
            error_cheat_sheet_first: 'Сначала сгенерируйте шпору.',
            error_download_parsed_first: 'Сначала сконвертируйте файл.',
            error_filter_no_variant_selected: 'Не выбрано ни одного количества вариантов для фильтрации.',
            error_filter_found_mismatch: 'Найдено {count} вопросов, не соответствующих фильтру.',
            error_filter_all_match: 'Все вопросы соответствуют заданному фильтру!',
            error_download_failed_generic: 'Не удалось скачать данные. Пожалуйста, попробуйте еще раз.',
            error_generic_for_alert: 'Произошла ошибка', // Для общих алертов
            copy_error: 'Не удалось скопировать. Скопируйте текст вручную.',
            copy_success: 'Содержимое скопировано в буфер обмена!',
            ai_explanation_question: 'Вопрос',
            ai_explanation_correct_answer: 'Правильный ответ',
            feedback_correct: 'Правильно!',
            feedback_incorrect: 'Неправильно!',
            mobile_download_ready_title: '✅ Файл готов к скачиванию!',
            mobile_download_button: '📥 Скачать файл',
            mobile_download_link_info: '💡 Ссылка будет активна 1 минуту',
            mobile_download_fallback_title: '⚠️ Альтернативный способ',
            mobile_download_fallback_p1: 'Не удалось создать ссылку для скачивания.',
            mobile_download_fallback_p2: 'Скопируйте содержимое файла',
            mobile_download_copy_button: '📋 Копировать',
            session_saved_success: 'Тест сохранён! Вы можете продолжить его в любой момент с главного экрана.',

            download_txt_question_label: 'Вопрос',
            download_txt_answer_label: 'Правильный ответ',

            quick_mode_title_on: "Быстрый режим ВКЛ (Автопереход)",
            quick_mode_title_off: "Быстрый режим ВЫКЛ (Ручной переход)",
            trigger_mode_title_on: "Триггер-слова ВКЛ (Кликните на слово в вопросе)",
            trigger_mode_title_off: "Триггер-слова ВЫКЛ",

            share_title_cheatsheet: "Шпора",
            share_title_errors: "Ошибки",
            share_title_triggered_quiz: "Тест с триггерами",
            share_title_converted_test: "Сконвертированный тест",

            error_review_questions_not_found: "Не удалось сформировать вопросы для работы над ошибками.",
            error_flashcard_translation_failed: "Не удалось перевести карточку. Будет показан оригинал.",

            error_load_file_first: "Сначала загрузите файл с вопросами.",

            manual_copy_title: "📋 Ручное копирование",
            manual_copy_p1: "Автоматическое копирование не сработало. Пожалуйста, выделите и скопируйте текст ниже:",
            manual_copy_close_button: "Закрыть",


            error_no_current_question: "Не удалось определить текущий вопрос.",
            error_session_save_failed: "Не удалось сохранить сессию. Возможно, в браузере закончилось место.",
            error_analysis_no_data: "Нет данных об ошибках для анализа.",
            error_no_question_for_explanation: "Не удалось распознать структуру вопроса для объяснения.",
            error_cannot_fully_process_question: "Не удалось полностью обработать вопрос для объяснения.",

            error_download_generic_with_filename: 'Не удалось скачать файл "{fileName}". Попробуйте еще раз.',
            mobile_download_preparing: 'Подготовка файла для скачивания...',

            tooltip_open_folder: 'Открыть папку "{name}"',
            tooltip_start_test: 'Запустить тест "{name}"',
            tooltip_load_file: 'Загрузить {name}',

            share_title_translated_test_txt: "Переведенный тест",
            share_title_translated_test_qst: "Переведенный тест (QST)",

            error_translation_failed: "Не удалось получить перевод.",
            ai_option_default: "(стандарт)",


            error_firebase_init: "Не удалось инициализировать Firebase. Чат будет недоступен. Ошибка:",
            copy_success_short: '✓ Скопировано!',
            ai_analyzing_text: "ИИ анализирует ваш текст...",

            parser_pattern_structured: "Структурированный тест (1. Вопрос, А) Ответ+)",
            parser_pattern_plus_at_end: "Ответ с '+' в конце строки",
            parser_pattern_no_markers: "Без маркеров (первый ответ - верный)",
            parser_pattern_numbered_plus: "Нумерованный список (1.) с ответом '+' в начале",
            parser_pattern_plus_at_start: "Ответ с '+' в начале строки",
            parser_pattern_tags_cyrillic: "Теги <Вопрос> и <вариант>",
            parser_pattern_tags_latin: "Теги <question> и <variant>",

            shuffle_n_questions: "Случайный набор из"
        },
        kk: {
            exit_toast_text: 'Шығу үшін тағы бір рет басыңыз',
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
            feedback_mode: 'Кері байланыс режимі (🤖ЖИ талдауы + қателермен жұмыс)',
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
            copy_success_short: '✓ Көшірілді!',




            // Header Buttons
            copy_question_title: 'Ағымдағы сұрақты көшіру',
            search_web_title: 'Интернеттен іздеу',
            chat_button_title: '💬',
            quick_mode_title: 'Жылдам режим (Автоматты өту)',
            trigger_words_title: 'Триггер-сөздер',
            theme_button_title: '🌗',
            language_toggle_title: 'Тілді өзгерту',
            favorite_button_title: 'Таңдаулыларға қосу',
            translate_question_title: 'Ағымдағы сұрақты аудару',
            // Messages
            search_query_too_short: 'Іздеу сұранысы кемінде 3 таңбадан тұруы керек.',
            file_empty_or_invalid_part1: '"',
            file_empty_or_invalid_part2: '" файлы бос немесе пішімі жарамсыз.',
            no_questions_for_settings: 'Ағымдағы баптаулар үшін сұрақтар табылмады.',
            confirm_finish_early: 'Тестті мерзімінен бұрын аяқтағыңыз келетініне сенімдісіз бе?',
            copy_button: "Көшіру",
            search_provider_db: "Дерекқор",
            relevance_tag: "Сәйкестілік:",
            copy_button: "Көшіру", 
            copy_question_tooltip: "Сұрақты көшіру",
            favorite_question_tooltip: "Таңдаулыларға қосу",

            copy_success: "Мазмұн алмасу буферіне көшірілді!",
            ai_explanation_title: '💡 ЖИ түсіндірмесі',
            ai_explanation_style_label: 'Түсіндіру стилі:',
            ai_explain_button: 'Түсіндіру💡',
            ai_explanation_loading: 'ЖИ түсіндірме дайындауда...',
            ai_generating_button: '🤖 Генерация...',
            ai_error_text_empty: 'Талдау үшін мәтінді енгізіңіз.',
            ai_error_generation: 'Тест жасау кезінде қате пайда болды.',
            ai_question_count_label: '4. ЖИ үшін сұрақтар санын көрсетіңіз:',
            ai_auto_mode_label: 'Авто',
            ai_style_simple: "Қарапайым",
            ai_style_scientific: "Ғылыми",
            ai_style_associative: "Аналогия",
            ai_style_stepbystep: "Қадаммен",
            ai_style_practical: "Практикалық",
            ai_style_visual: "Көрнекі",
            ai_answer_count_label: '5. Жауап нұсқаларының санын көрсетіңіз:',
            ai_auto_category_label: 'Санаттарды автоматты түрде жасау',
            exit_modal_title: 'Растау',
            exit_modal_text: 'Қосымшадан шыққыңыз келетініне сенімдісіз бе?',
            exit_modal_confirm: 'Шығу',
            exit_modal_cancel: 'Қалу',
            update_available_text: 'Жаңа нұсқасы қолжетімді!',
            update_button_text: 'Жаңарту',
            ai_explain_button_title: 'ЖИ арқылы түсіндіру',
            download_translated_txt_button: 'Аударманы жүктеу ({lang})(txt)',
            download_translated_qst_button: 'Аударманы жүктеу ({lang})(qst)',
            no_translations_to_download: 'Жүктеу үшін қолжетімді аудармалар жоқ.',
            error_creating_translation_file: 'Аударма файлын құру мүмкін болмады.',
            ai_show_original_button: 'Түпнұсқаны көрсету',
            ai_show_translation_button: 'Аударманы көрсету',
            flashcards_mode: 'Карточкалар режимі (сұрақ/жауап)',
            start_flashcards_button: 'Оқуды бастау',
            flashcard_category_label: 'Келесі бөлім:',
            results_flashcards_viewed: 'Қаралған карточкалар',
            session_cards_viewed: 'Қаралды',
            ai_error_generic: 'Түсіндірмені жасау мүмкін болмады. Қайталап көріңіз.',
            ai_error_server: 'Түсіндірмені жасау мүмкін болмады: Серверде уақытша қате пайда болды. Кейінірек қайталап көріңіз.',
            parser_overwrite_warning: 'Нәтиже өрісінде мәтін бар. Оны қайта жазғыңыз келетініне сенімдісіз бе?',
            ai_error_generation: 'Тест жасау кезінде қате пайда болды.',
            ai_error_server_generation: 'Тест жасау қатесі: Серверде уақытша қате пайда болды. Кейінірек қайталап көріңіз.',
            ai_char_limit_exceeded: 'Таңба шегінен асып кетті ({current}/{max})',

            tab_converter: "Мәтіннен түрлендіргіш",
            tab_ai_generator: "Тақырып бойынша ЖИ-генератор",
            ai_from_text_title: "🤖 Мәтініңізден тест жасау (ЖИ)",
            ai_generate_from_text_button: "Мәтіннен тест жасау",
            ai_topic_description: "ЖИ өз білімін пайдалана отырып, көрсетілген тақырып негізінде тестті өз бетінше жасайды.",
            ai_topic_label: "1. Тест жасау үшін тақырыпты енгізіңіз:",
            ai_topic_placeholder: "Мысалы: Республика кезеңіндегі Ежелгі Рим тарихы, 15 сұрақ, 4 жауап нұсқасы, соғыстар бойынша санаттармен...",
            ai_topic_question_count_label: "2. Сұрақтар саны (егер тақырыпта көрсетілмесе):",
            ai_topic_answer_count_label: "3. Жауап нұсқаларының саны (егер тақырыпта көрсетілмесе):",
            ai_generate_from_topic_button: "🤖 Тақырып бойынша тест жасау (ЖИ)",
            ai_thinking_topic: "ЖИ-генератор сіздің тақырыбыңызды ойластыруда...",
            ai_topic_auto_category_label: "4. Санаттарды автоматты түрде жасау",

            parser_auto_detect: '-- Автоматты түрде анықтау --',
            filter_variants_button: '⚙️ Нұсқалар сүзгісі',
            filter_variants_header: 'Нұсқалар санын таңдаңыз:',
            filter_apply_button: 'Қолдану',
            filter_reset_button: 'Тастау',
            loading_default_text: 'Жүктелуде...',
            search_no_results: 'Сіздің сұранысыңыз бойынша ештеңе табылмады.',
            search_error_prefix: 'Қате пайда болды:',
            gradus_loading: 'Жүктелуде...',
            gradus_folder_empty: 'Қалта бос',
            gradus_loading_error_prefix: 'Қате:',
            gradus_loading_quiz_prefix: 'Тест жүктелуде',
            error_no_questions_for_cheatsheet: 'Шпаргалка жасау үшін сұрақтар жоқ.',
            parser_input_empty_alert: 'Мәтін енгізу өрісі бос!',
            parser_pattern_not_found_alert: 'Қате пайда болды. Таңдалған үлгі табылмады.',
            parser_no_questions_recognized_alert: 'Таңдалған пішім бойынша бірде-бір сұрақ табылмады. Басқасын көріңіз.',
            parser_no_questions_with_errors_alert: 'Бірде-бір сұрақты тану мүмкін болмады. Табылған қателер: {count}.',
            parser_conversion_success_alert: '{count} сұрақ сәтті түрлендірілді!',
            parser_conversion_summary_alert: 'Операция аяқталды.\n\nТанылған сұрақтар: {parsed}\nПішімдеу қателері табылды: {errors}',
            ai_topic_empty_alert: 'Тест жасау үшін тақырыпты енгізіңіз.',
            ai_explanation_prepare_error: 'Түсіндірме терезесін дайындау мүмкін болмады.',
            ai_analyzing_errors_button: 'ЖИ талдауда... 🧠',
            ai_error_analysis_button: '🤖 ЖИ қателер аналитикасы',

            search_engine_google: 'Google',
            search_engine_yandex: 'Яндекс',
            search_engine_perplexity: 'Perplexity',
            footer_copyright: 'prod by @iverrum',
            error_no_question_to_copy: 'Көшіру үшін ағымдағы сұрақты анықтау мүмкін болмады.',
            error_no_question_to_favorite: 'Таңдаулыларға қосу үшін ағымдағы сұрақты анықтау мүмкін болмады.',
            error_favorites_require_auth: 'Таңдаулыларды пайдалану үшін аккаунтқа кіру қажет.',
            error_cannot_process_question: 'Сақтау үшін сұрақты өңдеу мүмкін болмады.',

            app_title: 'QSTiUM',
            confirm_delete_session: 'Сақталған "{fileName}" тестін жойғыңыз келетініне сенімдісіз бе? Бұл әрекетті қайтару мүмкін емес.',
            error_session_not_found: 'Қате: бұл файл үшін сақталған сессия табылмады.',
            error_session_file_not_found: 'Сессияны қалпына келтіру мүмкін болмады. Бастапқы файл "Жақында пайдаланылғандар" ішінде табылмады.',
            error_cheat_sheet_first: 'Алдымен шпаргалканы жасаңыз.',
            error_download_parsed_first: 'Алдымен файлды түрлендіріңіз.',
            error_filter_no_variant_selected: 'Сүзу үшін бірде-бір нұсқа саны таңдалмады.',
            error_filter_found_mismatch: 'Сүзгіге сәйкес келмейтін {count} сұрақ табылды.',
            error_filter_all_match: 'Барлық сұрақтар берілген сүзгіге сәйкес келеді!',
            error_download_failed_generic: 'Деректерді жүктеу мүмкін болмады. Қайталап көріңіз.',
            error_generic_for_alert: 'Қате пайда болды',

            copy_question_title: 'Ағымдағы сұрақты көшіру',
            search_web_title: 'Интернеттен іздеу',
            quick_mode_title: 'Жылдам режим (Автоматты өту)',
            trigger_words_title: 'Триггер-сөздер',
            theme_button_title: '🌗',
            language_toggle_title: 'Тілді өзгерту',
            favorite_button_title: 'Таңдаулыларға қосу',
            translate_question_title: 'Ағымдағы сұрақты аудару',
            footer_copyright: 'prod by @iverrum',
            exit_toast_text: 'Шығу үшін тағы бір рет басыңыз',
            app_title: 'QSTiUM',
            confirm_delete_session: 'Сақталған "{fileName}" тестін жойғыңыз келетініне сенімдісіз бе? Бұл әрекетті қайтару мүмкін емес.',
            error_session_not_found: 'Қате: бұл файл үшін сақталған сессия табылмады.',
            error_session_file_not_found: 'Сессияны қалпына келтіру мүмкін болмады. Бастапқы файл "Жақында пайдаланылғандар" ішінде табылмады.',
            error_cheat_sheet_first: 'Алдымен шпаргалканы жасаңыз.',
            error_download_parsed_first: 'Алдымен файлды түрлендіріңіз.',
            error_filter_no_variant_selected: 'Сүзу үшін бірде-бір нұсқа саны таңдалмады.',
            error_filter_found_mismatch: 'Сүзгіге сәйкес келмейтін {count} сұрақ табылды.',
            error_filter_all_match: 'Барлық сұрақтар берілген сүзгіге сәйкес келеді!',
            error_download_failed_generic: 'Деректерді жүктеу мүмкін болмады. Қайталап көріңіз.',
            error_generic_for_alert: 'Қате пайда болды',
            loading_default_text: 'Жүктелуде...',
            search_no_results: 'Сіздің сұранысыңыз бойынша ештеңе табылмады.',
            search_error_prefix: 'Қате пайда болды:',
            gradus_loading: 'Жүктелуде...',
            gradus_folder_empty: 'Қалта бос',
            gradus_loading_error_prefix: 'Қате:',
            gradus_loading_quiz_prefix: 'Тест жүктелуде',
            error_no_questions_for_cheatsheet: 'Шпаргалка жасау үшін сұрақтар жоқ.',
            parser_input_empty_alert: 'Мәтін енгізу өрісі бос!',
            parser_pattern_not_found_alert: 'Қате пайда болды. Таңдалған үлгі табылмады.',
            parser_no_questions_recognized_alert: 'Таңдалған пішім бойынша бірде-бір сұрақ табылмады. Басқасын көріңіз.',
            parser_no_questions_with_errors_alert: 'Бірде-бір сұрақты тану мүмкін болмады. Табылған қателер: {count}.',
            parser_conversion_success_alert: '{count} сұрақ сәтті түрлендірілді!',
            parser_conversion_summary_alert: 'Операция аяқталды.\n\nТанылған сұрақтар: {parsed}\nПішімдеу қателері табылды: {errors}',
            ai_topic_empty_alert: 'Тест жасау үшін тақырыпты енгізіңіз.',
            ai_explanation_prepare_error: 'Түсіндірме терезесін дайындау мүмкін болмады.',
            error_no_question_to_copy: 'Көшіру үшін ағымдағы сұрақты анықтау мүмкін болмады.',
            error_no_question_to_favorite: 'Таңдаулыларға қосу үшін ағымдағы сұрақты анықтау мүмкін болмады.',
            error_favorites_require_auth: 'Таңдаулыларды пайдалану үшін аккаунтқа кіру қажет.',
            error_cannot_process_question: 'Сақтау үшін сұрақты өңдеу мүмкін болмады.',

            ai_explanation_question: 'Сұрақ',
            ai_explanation_correct_answer: 'Дұрыс жауап',

            feedback_correct: 'Дұрыс!',
            feedback_incorrect: 'Қате!',

            mobile_download_ready_title: '✅ Файл жүктеуге дайын!',
            mobile_download_button: '📥 Файлды жүктеу',
            mobile_download_link_info: '💡 Сілтеме 1 минут бойы белсенді болады',
            mobile_download_fallback_title: '⚠️ Балама тәсіл',
            mobile_download_fallback_p1: 'Жүктеу сілтемесін жасау мүмкін болмады.',
            mobile_download_fallback_p2: 'Файлдың мазмұнын көшіріңіз',
            mobile_download_copy_button: '📋 Көшіру',
            session_saved_success: 'Тест сақталды! Сіз оны кез келген уақытта басты экраннан жалғастыра аласыз.',

            download_txt_question_label: 'Сұрақ',
            download_txt_answer_label: 'Дұрыс жауап',

            quick_mode_title_on: "Жылдам режим ҚОСУЛЫ (Автоматты өту)",
            quick_mode_title_off: "Жылдам режим ӨШІРУЛІ (Қолмен өту)",
            trigger_mode_title_on: "Триггер-сөздер ҚОСУЛЫ (Сұрақтағы сөзге басыңыз)",
            trigger_mode_title_off: "Триггер-сөздер ӨШІРУЛІ",

            share_title_cheatsheet: "Шпаргалка",
            share_title_errors: "Қателер",
            share_title_triggered_quiz: "Триггерлері бар тест",
            share_title_converted_test: "Түрлендірілген тест",

            error_review_questions_not_found: "Қателермен жұмыс істеу үшін сұрақтарды қалыптастыру мүмкін болмады.",
            error_flashcard_translation_failed: "Карточканы аудару мүмкін болмады. Түпнұсқа көрсетіледі.",

            error_load_file_first: "Алдымен сұрақтары бар файлды жүктеңіз.",

            manual_copy_title: "📋 Қолмен көшіру",
            manual_copy_p1: "Автоматты көшіру орындалмады. Төмендегі мәтінді белгілеп, көшіріп алыңыз:",
            manual_copy_close_button: "Жабу",

            error_no_current_question: "Ағымдағы сұрақты анықтау мүмкін болмады.",
            error_session_save_failed: "Сессияны сақтау мүмкін болмады. Браузерде орын жеткіліксіз болуы мүмкін.",
            error_analysis_no_data: "Талдау үшін қателер туралы деректер жоқ.",
            error_no_question_for_explanation: "Түсіндіру үшін сұрақтың құрылымын тану мүмкін болмады.",
            error_cannot_fully_process_question: "Түсіндіру үшін сұрақты толық өңдеу мүмкін болмады.",

            error_download_generic_with_filename: '"{fileName}" файлын жүктеу мүмкін болмады. Қайталап көріңіз.',
            mobile_download_preparing: 'Файлды жүктеуге дайындау...',

            tooltip_open_folder: '"{name}" қалтасын ашу',
            tooltip_start_test: '"{name}" тестін бастау',
            tooltip_load_file: '{name} файлын жүктеу',

            share_title_translated_test_txt: "Аударылған тест",
            share_title_translated_test_qst: "Аударылған тест (QST)",

            error_translation_failed: "Аударманы алу мүмкін болмады.",
            ai_option_default: "(стандартты)",

            error_firebase_init: "Firebase инициализациясы сәтсіз аяқталды. Чат қолжетімсіз болады. Қате:",
            ai_analyzing_text: "ЖИ сіздің мәтініңізді талдауда...",

            parser_pattern_structured: "Құрылымды тест (1. Сұрақ, А) Жауап+)",
            parser_pattern_plus_at_end: "Жол соңында '+' белгісі бар жауап",
            parser_pattern_no_markers: "Белгілерсіз (бірінші жауап - дұрыс)",
            parser_pattern_numbered_plus: "Нөмірленген тізім (1.) басында '+' жауабы бар",
            parser_pattern_plus_at_start: "Жол басында '+' белгісі бар жауап",
            parser_pattern_tags_cyrillic: "<Вопрос> және <вариант> тегтері",
            parser_pattern_tags_latin: "<question> және <variant> тегтері",

            ai_question_count_label: '4. ЖИ үшін сұрақтар санын көрсетіңіз:',
            ai_answer_count_label: '5. Жауап нұсқаларының санын көрсетіңіз:',
            ai_auto_category_label: 'Санаттарды автоматты түрде жасау',

            shuffle_n_questions: "Араластырылған жиынтық"

        },
        en: {
            // Main Screen
            exit_toast_text: 'Press back again to exit',
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
            feedback_mode: 'Feedback Mode (🤖AI analysis + review incorrect answers)',
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
            quick_mode_title: 'Quick Mode (Auto-advance)',
            trigger_words_title: 'Trigger Words',
            theme_button_title: '🌗',
            language_toggle_title: 'Change Language',
            favorite_button_title: 'Add to Favorites',
            translate_question_title: 'Translate current question',
            // Messages (ПОЛНОСТЬЮ ПЕРЕВЕДЕНО)
            search_query_too_short: 'Search query must contain at least 3 characters.',
            file_empty_or_invalid_part1: 'File "',
            file_empty_or_invalid_part2: '" is empty or has an invalid format.',
            no_questions_for_settings: 'No questions found for the current settings.',
            confirm_finish_early: 'Are you sure you want to finish the quiz early?',
            copy_button: "Copy",
            search_provider_db: "Database",
            relevance_tag: "Relevance:",
            copy_button: "Copy",
            copy_question_tooltip: "Copy question",
            favorite_question_tooltip: "Add to favorites",
            ai_generating_button: '🤖 Generating...',
            ai_error_text_empty: 'Please paste text to analyze.',
            ai_error_generation: 'An error occurred while generating the test.',

            copy_success: "Content copied to clipboard!",
            ai_explanation_title: '💡 AI Explanation',
            ai_explanation_style_label: 'Explanation Style:',
            ai_explain_button: 'Explain💡',
            ai_explanation_loading: 'AI is preparing an explanation...',
            ai_generating_button: '🤖 Generating...',
            ai_error_text_empty: 'Please paste text to analyze.',
            ai_error_generation: 'An error occurred while generating the test.',
            ai_question_count_label: '4. Specify the number of questions for the AI:',
            ai_auto_mode_label: 'Auto',
            ai_style_simple: "Simple",
            ai_style_scientific: "Scientific",
            ai_style_associative: "Analogy",
            ai_style_stepbystep: "Step-by-step",
            ai_style_practical: "Practical",
            ai_style_visual: "Visual",
            ai_answer_count_label: '5. Specify the number of answer choices:',
            ai_auto_category_label: 'Automatically create categories',

            exit_modal_title: 'Confirmation',
            exit_modal_text: 'Are you sure you want to exit the application?',
            exit_modal_confirm: 'Exit',
            exit_modal_cancel: 'Stay',
            update_available_text: 'A new version is available!',
            update_button_text: 'Update',
            ai_explain_button_title: 'Explain with AI',
            download_translated_quiz_button: 'Download translation ({lang})',
            no_translations_to_download: 'No available translations to download.',
            error_creating_translation_file: 'Failed to create translation file.',
            download_translated_txt_button: 'Download translation ({lang})(txt)',
            download_translated_qst_button: 'Download translation ({lang})(qst)',
            no_translations_to_download: 'No available translations to download.',
            error_creating_translation_file: 'Failed to create translation file.',
            ai_show_original_button: 'Show Original',
            ai_show_translation_button: 'Show Translation',
            flashcards_mode: 'Flashcards mode (question/answer)',
            start_flashcards_button: 'Start Learning',
            flashcard_category_label: 'Next Section:',
            results_flashcards_viewed: 'Cards Viewed',
            session_cards_viewed: 'Viewed',
            ai_error_generic: 'Failed to generate explanation. Please try again.',
            ai_error_server: 'Failed to generate explanation: A temporary server error occurred. Please try again later.',
            parser_overwrite_warning: 'The result field already contains text. Are you sure you want to overwrite it?',
            ai_error_generation: 'An error occurred while generating the test.',
            ai_error_server_generation: 'Test generation failed: A temporary server error occurred. Please try again later.',
            ai_char_limit_exceeded: 'Character limit exceeded ({current}/{max})',

            tab_converter: "Converter from Text",
            tab_ai_generator: "AI Generator by Topic",
            ai_from_text_title: "🤖 Create Test from Your Text (AI)",
            ai_generate_from_text_button: "Generate Test from Text",
            ai_topic_description: "The AI will independently create a test based on the specified topic using its knowledge.",
            ai_topic_label: "1. Enter a topic to generate a test:",
            ai_topic_placeholder: "Example: History of Ancient Rome during the Republic, 15 questions, 4 answer choices, with categories by wars...",
            ai_topic_question_count_label: "2. Number of questions (if not specified in the topic):",
            ai_topic_answer_count_label: "3. Number of answer choices (if not specified in the topic):",
            ai_generate_from_topic_button: "🤖 Create Test by Topic (AI)",
            ai_thinking_topic: "AI generator is thinking about your topic...",
            ai_topic_auto_category_label: "4. Automatically create categories",

            parser_auto_detect: '-- Automatic detection --',
            filter_variants_button: '⚙️ Filter by variants',
            filter_variants_header: 'Select number of variants:',
            filter_apply_button: 'Apply',
            filter_reset_button: 'Reset',
            loading_default_text: 'Loading...',
            search_no_results: 'Nothing was found for your query.',
            search_error_prefix: 'An error occurred:',
            gradus_loading: 'Loading...',
            gradus_folder_empty: 'Folder is empty',
            gradus_loading_error_prefix: 'Error:',
            gradus_loading_quiz_prefix: 'Loading quiz',
            error_no_questions_for_cheatsheet: 'No questions to generate a cheat sheet.',
            parser_input_empty_alert: 'The text input field is empty!',
            parser_pattern_not_found_alert: 'An error occurred. The selected pattern was not found.',
            parser_no_questions_recognized_alert: 'Could not find any questions for the selected format. Try another one.',
            parser_no_questions_with_errors_alert: 'Failed to recognize any questions. Errors found: {count}.',
            parser_conversion_success_alert: 'Successfully converted {count} questions!',
            parser_conversion_summary_alert: 'Operation completed.\n\nQuestions recognized: {parsed}\nFormatting errors found: {errors}',
            ai_topic_empty_alert: 'Please enter a topic to generate the test.',
            ai_explanation_prepare_error: 'Failed to prepare the explanation window.',
            ai_analyzing_errors_button: 'AI is analyzing... 🧠',
            ai_error_analysis_button: '🤖 AI Error Analysis',

            search_engine_google: 'Google',
            search_engine_yandex: 'Yandex',
            search_engine_perplexity: 'Perplexity',
            footer_copyright: 'prod by @iverrum',
            error_no_question_to_copy: 'Could not determine the current question to copy.',
            error_no_question_to_favorite: 'Could not determine the current question to add to favorites.',
            error_favorites_require_auth: 'You must be logged in to use favorites.',
            error_cannot_process_question: 'Could not process the question for saving.',


            app_title: 'QSTiUM',
            confirm_delete_session: 'Are you sure you want to delete the saved quiz "{fileName}"? This action is irreversible.',
            error_session_not_found: 'Error: saved session for this file not found.',
            error_session_file_not_found: 'Could not restore session. The original file was not found in "Recently used".',
            error_cheat_sheet_first: 'First, generate the cheat sheet.',
            error_download_parsed_first: 'First, convert the file.',
            error_filter_no_variant_selected: 'No number of variants selected for filtering.',
            error_filter_found_mismatch: 'Found {count} questions that do not match the filter.',
            error_filter_all_match: 'All questions match the specified filter!',

            error_download_failed_generic: 'Failed to download data. Please try again.',
            error_generic_for_alert: 'An error occurred',

            copy_question_title: 'Copy current question',
            search_web_title: 'Search the web',
            chat_button_title: '💬',
            quick_mode_title: 'Quick Mode (Auto-advance)',
            trigger_words_title: 'Trigger Words',
            theme_button_title: '🌗',
            language_toggle_title: 'Change Language',
            favorite_button_title: 'Add to Favorites',
            translate_question_title: 'Translate current question',
            footer_copyright: 'prod by @iverrum',
            exit_toast_text: 'Press back again to exit',
            app_title: 'QSTiUM',
            confirm_delete_session: 'Are you sure you want to delete the saved quiz "{fileName}"? This action is irreversible.',
            error_session_not_found: 'Error: saved session for this file not found.',
            error_session_file_not_found: 'Could not restore session. The original file was not found in "Recently used".',
            error_cheat_sheet_first: 'First, generate the cheat sheet.',
            error_download_parsed_first: 'First, convert the file.',
            error_filter_no_variant_selected: 'No number of variants selected for filtering.',
            error_filter_found_mismatch: 'Found {count} questions that do not match the filter.',
            error_filter_all_match: 'All questions match the specified filter!',
            error_download_failed_generic: 'Failed to download data. Please try again.',
            error_generic_for_alert: 'An error occurred',
            loading_default_text: 'Loading...',
            search_no_results: 'Nothing was found for your query.',
            search_error_prefix: 'An error occurred:',
            gradus_loading: 'Loading...',
            gradus_folder_empty: 'Folder is empty',
            gradus_loading_error_prefix: 'Error:',
            gradus_loading_quiz_prefix: 'Loading quiz',
            error_no_questions_for_cheatsheet: 'No questions to generate a cheat sheet.',
            parser_input_empty_alert: 'The text input field is empty!',
            parser_pattern_not_found_alert: 'An error occurred. The selected pattern was not found.',
            parser_no_questions_recognized_alert: 'Could not find any questions for the selected format. Try another one.',
            parser_no_questions_with_errors_alert: 'Failed to recognize any questions. Errors found: {count}.',
            parser_conversion_success_alert: 'Successfully converted {count} questions!',
            parser_conversion_summary_alert: 'Operation completed.\n\nQuestions recognized: {parsed}\nFormatting errors found: {errors}',
            ai_topic_empty_alert: 'Please enter a topic to generate the test.',
            ai_explanation_prepare_error: 'Failed to prepare the explanation window.',
            error_no_question_to_copy: 'Could not determine the current question to copy.',
            error_no_question_to_favorite: 'Could not determine the current question to add to favorites.',
            error_favorites_require_auth: 'You must be logged in to use favorites.',
            error_cannot_process_question: 'Could not process the question for saving.',

            ai_explanation_question: 'Question',
            ai_explanation_correct_answer: 'Correct Answer',
            feedback_correct: 'Correct!',
            feedback_incorrect: 'Incorrect!',

            mobile_download_ready_title: '✅ File is ready for download!',
            mobile_download_button: '📥 Download file',
            mobile_download_link_info: '💡 The link will be active for 1 minute',
            mobile_download_fallback_title: '⚠️ Alternative method',
            mobile_download_fallback_p1: 'Failed to create a download link.',
            mobile_download_fallback_p2: 'Copy the file contents',
            mobile_download_copy_button: '📋 Copy',
            session_saved_success: 'Quiz saved! You can continue it at any time from the main screen.',

            download_txt_question_label: 'Question',
            download_txt_answer_label: 'Correct Answer',

            quick_mode_title_on: "Quick Mode ON (Auto-advance)",
            quick_mode_title_off: "Quick Mode OFF (Manual advance)",
            trigger_mode_title_on: "Trigger Words ON (Click a word in the question)",
            trigger_mode_title_off: "Trigger Words OFF",

            share_title_cheatsheet: "Cheat Sheet",
            share_title_errors: "Mistakes",
            share_title_triggered_quiz: "Quiz with Triggers",
            share_title_converted_test: "Converted Test",

            error_review_questions_not_found: "Failed to generate questions for mistake review.",
            error_flashcard_translation_failed: "Failed to translate the flashcard. The original will be shown.",

            error_load_file_first: "Please load a file with questions first.",

            manual_copy_title: "📋 Manual Copy",
            manual_copy_p1: "Automatic copy failed. Please select and copy the text below:",
            manual_copy_close_button: "Close",

            error_no_current_question: "Could not determine the current question.",
            error_session_save_failed: "Failed to save the session. The browser may be out of storage space.",
            error_analysis_no_data: "No error data to analyze.",
            error_no_question_for_explanation: "Could not recognize the question structure for an explanation.",
            error_cannot_fully_process_question: "Could not fully process the question for an explanation.",

            error_download_generic_with_filename: 'Failed to download file "{fileName}". Please try again.',
            mobile_download_preparing: 'Preparing file for download...',

            tooltip_open_folder: 'Open folder "{name}"',
            tooltip_start_test: 'Start test "{name}"',
            tooltip_load_file: 'Load {name}',

            share_title_translated_test_txt: "Translated Test",
            share_title_translated_test_qst: "Translated Test (QST)",

            error_translation_failed: "Failed to get translation.",
            ai_option_default: "(standard)",

            error_firebase_init: "Failed to initialize Firebase. Chat will be unavailable. Error:",
            ai_analyzing_text: "AI is analyzing your text...",

            parser_pattern_structured: "Structured Test (1. Question, A) Answer+)",
            parser_pattern_plus_at_end: "Answer with '+' at the end of the line",
            parser_pattern_no_markers: "No markers (first answer is correct)",
            parser_pattern_numbered_plus: "Numbered list (1.) with '+' answer at the start",
            parser_pattern_plus_at_start: "Answer with '+' at the start of the line",
            parser_pattern_tags_cyrillic: "Tags <Вопрос> and <вариант>",
            parser_pattern_tags_latin: "Tags <question> and <variant>",
            copy_success_short: '✓ Copied!',


            ai_question_count_label: '4. Specify the number of questions for the AI:',
            ai_answer_count_label: '5. Specify the number of answer choices:',
            ai_auto_category_label: 'Automatically create categories',

            shuffle_n_questions: "Random set of"
        }


    };





    function _(key) {
        const currentLang = localStorage.getItem('appLanguage') || 'ru';
        return LANG_PACK[currentLang][key] || key;
    }

    const getEl = (id) => document.getElementById(id);

    /**
     * Создает уникальный ключ для кэша, комбинируя индекс вопроса и код языка.
     * @param {number} originalIndex - Уникальный индекс вопроса.
     * @param {string} lang - Код языка (например, 'ru', 'en').
     * @returns {string} - Комбинированный ключ (например, '15_en').
     */
    function getCacheKey(originalIndex, lang) {
        return `${originalIndex}_${lang}`;
    }


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
        savedSessionList, appTitleHeader;

    let rangeSliderStart, rangeSliderEnd, sliderProgress, questionRangeGroup,
            shuffleNCheckbox, shuffleNCountInput, sliderTicks, timeSliderTicks;

    let themeDropdownContainer, themeDropdownButton, themeDropdownContent, themeIcon;
    let converterTabBtn, aiGeneratorTabBtn, converterContent, aiGeneratorContent, 
        aiTopicInput, generateTestFromTopicBtn, aiTopicQuestionCount, aiTopicAnswerCount;
    let aiTopicAutoCategory;

    let generateTestFromTextBtn, aiQuestionCount, aiAutoCount, aiAutoCategory;
    let exitConfirmationModal, confirmExitBtn, cancelExitBtn;
    let updateNotification, updateBtn, translateQuestionBtn;
    let downloadTranslatedTxtButton, downloadTranslatedQstButton;
    let flashcardsModeCheckbox;


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
    let currentQuizErrorData = [];
    let timerInterval = null;
    let timeLeftInSeconds = 0;
    const MAX_RECENT_FILES = 20;
    const RECENT_FILES_STORAGE_KEY = 'recentQstFilesData';
    const SAVED_SESSIONS_STORAGE_KEY = 'savedQuizSessions'; 
    let originalFileNameForReview = '';
    let generatedCheatSheetContent = '';
    let breadcrumbs = [];
    let searchResultsData = [];
    let currentResultIndex = 0;
    let currentQuizContext = null;
    let quizStartTime = 0;
    let currentAIQuestion = null; // Переменная для хранения текущего вопроса
    let currentAITranslation = null; // НОВАЯ: для хранения перевода в модальном окне
    let isAIModalShowingTranslation = false; // НОВАЯ: состояние отображения в модальном окне
    let isExitConfirmed = false;
    let isTranslateModeEnabled = localStorage.getItem('isTranslateModeEnabled') === 'true'; 
    let currentQuizTranslations = new Map(); // Для кэша в текущей сессии
    let currentAIUserIncorrectAnswer = null;
    let currentFileCacheKey = null; // Уникальный ключ для файла в localStorage
    const AI_INPUT_CHAR_LIMIT = 14000; // Безопасный лимит символов для ИИ


    

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
        generateTestFromTextBtn = getEl('generateTestFromTextBtn');
        aiQuestionCount = getEl('aiQuestionCount');
        aiAutoCount = getEl('aiAutoCount');
        aiAutoCategory = getEl('aiAutoCategory');
        exitConfirmationModal = getEl('exitConfirmationModal');
        confirmExitBtn = getEl('confirmExitBtn');
        cancelExitBtn = getEl('cancelExitBtn');
        updateNotification = getEl('updateNotification');
        updateBtn = getEl('updateBtn');
        appTitleHeader = getEl('appTitleHeader');

        themeDropdownContainer = getEl('themeDropdownContainer');
        themeDropdownButton = getEl('themeDropdownButton');
        themeDropdownContent = getEl('themeDropdownContent');
        themeIcon = getEl('themeIcon');

        flashcardsModeCheckbox = getEl('flashcardsMode');

        translateQuestionBtn = getEl('translateQuestionBtn');
        downloadTranslatedTxtButton = getEl('downloadTranslatedTxtButton');
        downloadTranslatedQstButton = getEl('downloadTranslatedQstButton');
        converterTabBtn = getEl('converterTabBtn');
        aiGeneratorTabBtn = getEl('aiGeneratorTabBtn');
        converterContent = getEl('converterContent');
        aiGeneratorContent = getEl('aiGeneratorContent');
        aiTopicInput = getEl('aiTopicInput');
        generateTestFromTopicBtn = getEl('generateTestFromTopicBtn');
        aiTopicQuestionCount = getEl('aiTopicQuestionCount');
        aiTopicAnswerCount = getEl('aiTopicAnswerCount');
        aiTopicAutoCategory = getEl('aiTopicAutoCategory');

        rangeSliderStart = getEl('rangeSliderStart');
        rangeSliderEnd = getEl('rangeSliderEnd');
        sliderProgress = getEl('sliderProgress');
        questionRangeGroup = getEl('questionRangeGroup');
        shuffleNCheckbox = getEl('shuffleNQuestions');
        shuffleNCountInput = getEl('shuffleNQuestionsCount');
        sliderTicks = getEl('sliderTicks');
        timeSliderTicks = getEl('timeSliderTicks');
        initServiceWorkerUpdater();

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
            alert(`${_('error_firebase_init')} ${e.message}`);
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
        populateThemeDropdown();
        setLanguage(savedLang);
        createVariantFilterCheckboxes();
        manageBackButtonInterceptor();
        setupExtensionListener();
        setupAnimationObserver();
    }



    async function copyToClipboardMain(text) {
        try {
            if (navigator.clipboard && navigator.clipboard.writeText) {
                await navigator.clipboard.writeText(text);
                // Теперь функция _() здесь доступна!
                showCopyNotification(_('copy_success')); 
            } else {
                // Fallback для старых браузеров
                const textArea = document.createElement('textarea');
                textArea.value = text;
                document.body.appendChild(textArea);
                textArea.select();
                textArea.setSelectionRange(0, 99999);
                document.execCommand('copy');
                document.body.removeChild(textArea);
                showCopyNotification(_('copy_success'));
            }
        } catch (error) {
            console.error('Ошибка копирования:', error);
            // Исправляем сообщение об ошибке, чтобы оно тоже переводилось
            alert(_('copy_error'));
        }
    }


    
    function setupEventListeners() {

        getEl('favoriteQuestionBtn')?.addEventListener('click', handleFavoriteClickInQuiz);
        translateQuestionBtn?.addEventListener('click', toggleTranslateMode);
        getEl('copyExplanationBtn')?.addEventListener('click', handleCopyExplanation);
        fileInput.addEventListener('change', handleFileSelect);
        startQuizButton.addEventListener('click', () => applySettingsAndStartQuiz(false, null));
        gradusButton?.addEventListener('click', () => {
            fileUploadArea.classList.add('hidden');
            gradusFoldersContainer.classList.remove('hidden');
            renderGradusView(GRADUS_ROOT_FOLDER_ID, 'GRADUS', true);
            manageBackButtonInterceptor();
        });
        backToFileUploadButton?.addEventListener('click', () => {
            gradusFoldersContainer.classList.add('hidden');
            fileUploadArea.classList.remove('hidden');
            manageBackButtonInterceptor();
        });
        searchButton?.addEventListener('click', performSearch);
        backToSearchButton?.addEventListener('click', () => {
            searchResultsContainer.classList.add('hidden');
            fileUploadArea.classList.remove('hidden');
            searchQueryInput.value = '';
            manageBackButtonInterceptor();
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

        // ===== НОВЫЕ ОБРАБОТЧИКИ ДЛЯ ВКЛАДОК ПАРСЕРА =====
        converterTabBtn?.addEventListener('click', () => switchParserTab('converter'));
        aiGeneratorTabBtn?.addEventListener('click', () => switchParserTab('aiGenerator'));

        // Обработчик для НОВОЙ кнопки генерации по теме
        generateTestFromTopicBtn?.addEventListener('click', handleAIGenerationFromTopicRequest);

        generateTestFromTextBtn?.addEventListener('click', handleAIGenerationRequest);

        aiAutoCount?.addEventListener('change', () => {
            aiQuestionCount.disabled = aiAutoCount.checked;
        });

        getEl('aiExplanationTranslateBtn')?.addEventListener('click', handleAITranslateToggle);
        flashcardsModeCheckbox?.addEventListener('change', handleFlashcardsModeChange);

        getEl('aiAnalysisBtn')?.addEventListener('click', requestErrorAnalysis);
        // Клик на главную кнопку для открытия/закрытия списка
        getEl('aiExplanationStyleButton')?.addEventListener('click', (e) => {
            e.stopPropagation();
            getEl('aiExplanationStyleDropdown').classList.toggle('open');
            getEl('aiExplanationStyleContent').classList.toggle('hidden');
        });

        // Клик на один из пунктов в списке
        getEl('aiExplanationStyleContent')?.addEventListener('click', (e) => {
            e.preventDefault();
            const target = e.target.closest('a');
            if (target && target.dataset.style) {
                const style = target.dataset.style;

                // Обновляем текст на главной кнопке
                getEl('aiExplanationStyleText').textContent = target.textContent;
                
                // Закрываем список
                getEl('aiExplanationStyleDropdown').classList.remove('open');
                getEl('aiExplanationStyleContent').classList.add('hidden');

                fetchAndDisplayExplanation(style, currentAIUserIncorrectAnswer);
            }
        });

        // Закрываем список при клике в любом другом месте окна
        window.addEventListener('click', () => {
            const dropdown = getEl('aiExplanationStyleDropdown');
            if (dropdown && dropdown.classList.contains('open')) {
                dropdown.classList.remove('open');
                getEl('aiExplanationStyleContent').classList.add('hidden');
            }
        });


        // Внутри функции setupEventListeners()
        parserButton?.addEventListener('click', () => {
            fileUploadArea.classList.add('hidden');
            parserArea.classList.remove('hidden');
            manageBackButtonInterceptor();
        });

        backToMainFromParserBtn?.addEventListener('click', () => {
            parserArea.classList.add('hidden');
            fileUploadArea.classList.remove('hidden');
            manageBackButtonInterceptor();
        });

        parserFileInput?.addEventListener('change', handleParserFileInput);
        runParserBtn?.addEventListener('click', runParser);
        downloadParsedBtn?.addEventListener('click', downloadParsedQst);
        clearParserInputBtn?.addEventListener('click', clearParserInput);
        parserInput?.addEventListener('input', checkAICharacterLimit);


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
        timeLimitInput.addEventListener('input', () => {
                    timeLimitValueDisplay.textContent = timeLimitInput.value;
                    updateSingleSliderVisuals();
                });




        // --- Исправленная логика для выпадающего списка тем ---
        themeDropdownButton?.addEventListener('click', (event) => {
            event.stopPropagation(); // Предотвращаем "всплытие" клика до window
            themeDropdownContent.classList.toggle('show');
        });

        themeDropdownContent?.addEventListener('click', (event) => {
            event.preventDefault();
            const target = event.target.closest('a');
            if (target && target.dataset.theme) {
                setTheme(target.dataset.theme);
                themeDropdownContent.classList.remove('show'); // <-- ВОТ ЭТА СТРОКА
            }
        });
        
        // Универсальный обработчик для закрытия всех выпадающих списков
        window.addEventListener('click', (event) => {
            // Закрываем список поисковиков
            if (!event.target.closest('#webSearchDropdown') && searchDropdownContent?.classList.contains('show')) {
                searchDropdownContent.classList.remove('show');
            }
            // Закрываем список тем (УЛУЧШЕННАЯ ЛОГИКА)
            if (!event.target.closest('#themeDropdownContainer') && themeDropdownContent?.classList.contains('show')) {
                themeDropdownContent.classList.remove('show');
            }
        });




        languageToggle?.addEventListener('click', toggleLanguage);
        chatToggleBtn?.addEventListener('click', () => {
            ChatModule.openChatModal();
        });
                
        prevResultBtn?.addEventListener('click', () => {
            if (currentResultIndex > 0) {
                currentResultIndex--;
                displaySingleResult(currentResultIndex);
                if (isTranslateModeEnabled && !quizArea.classList.contains('hidden') && questionsForCurrentQuiz.length > 0) {
    loadQuestion(currentQuestionIndex);
}
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


        // Обработчики для кнопок в модальном окне выхода
        cancelExitBtn?.addEventListener('click', () => {
            isExitConfirmed = false;
            hideExitConfirmationModal();
        });

        confirmExitBtn?.addEventListener('click', () => {

            window.location.href = 'about:blank';
        });

        // === НАЧАЛО ИЗМЕНЕНИЙ ===
        downloadTranslatedTxtButton?.addEventListener('click', handleDownloadTranslatedTxt);
        downloadTranslatedQstButton?.addEventListener('click', handleDownloadTranslatedQst);
        // === КОНЕЦ ИЗМЕНЕНИЙ ===

        shuffleNCheckbox?.addEventListener('change', handleShuffleNToggle);


    }



    function handleBackButton(event) {
        const chatOverlay = document.getElementById('chatOverlay');
        if (chatOverlay && !chatOverlay.classList.contains('hidden')) {
            event.preventDefault();
            ChatModule.closeChatModal();
            return;
        }

        if (!fileUploadArea.classList.contains('hidden')) {
            event.preventDefault();

            if (backButtonPressedOnce) {
                // Это второе нажатие - закрываем приложение
                // Для PWA самый надежный способ - попытаться использовать navigator.app.exitApp
                if (navigator.app && navigator.app.exitApp) {
                    navigator.app.exitApp();
                } else {
                    // Если API недоступно, просто позволяем браузеру сделать "назад",
                    // что в большинстве случаев закроет PWA.
                    window.removeEventListener('popstate', handleBackButton);
                    history.back();
                }
                return;
            }

            // Это первое нажатие
            backButtonPressedOnce = true;
            showExitToast();

            // Сбрасываем флаг через 2 секунды
            setTimeout(() => {
                backButtonPressedOnce = false;
            }, 2000);

            // "Отменяем" нажатие кнопки "назад"
            history.pushState({ page: 'app' }, "QSTiUM", "#app");

        } else {
            resetQuizForNewFile();
        }
    }


    function showGlobalLoader(message = _('loading_default_text')) {
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
        manageBackButtonInterceptor()
        
        searchResultCardsContainer.innerHTML = `
            <div class="loading-placeholder">
            <div class="loading-spinner"></div>
            <span>${_('searching_in_db')}</span>
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
            searchResultCardsContainer.innerHTML = `<div class="search-no-results-message">${_('search_error_prefix')} ${error.message}</div>`;
        }
    }



    function renderSearchResults(results) {
        searchResultsData = results || [];
        currentResultIndex = 0;

        if (searchResultsData.length === 0) {
            searchNavigation.classList.add('hidden');
            searchResultCardsContainer.innerHTML = `<div class="search-no-results-message">${_('search_no_results')}</div>`;
            return;
        }
        
        searchNavigation.classList.remove('hidden');
        displaySingleResult(currentResultIndex);
    }
    




    function displaySingleResult(index) {
        const resultText = searchResultsData[index];
        if (!resultText) return;

        const cardContentHTML = parseAndRenderQuestionBlock(resultText);
        // Мы используем одинарные кавычки для атрибута onclick и добавляем
        // результат экранированной строки. Это самый надежный способ.
       const escapedResultText = escape(resultText);

        searchResultCardsContainer.innerHTML = `
            <div class="result-card">
                <div class="result-card-header">
                    <div class="result-card-actions">
                        <span class="relevance-tag">${_('relevance_tag')} ${100 - index}%</span>
                        <button class="explain-search-result-btn" title="${_('ai_explain_button_title')}" onclick='window.mainApp.handleExplainClickInSearch(event, "${escapedResultText}")'>💡</button>
                        <button class="copy-search-result-btn" title="${_('copy_question_tooltip')}" onclick='window.mainApp.handleCopyClickInSearch(event, "${escapedResultText}")'>📋</button>
                        <button class="favorite-search-result-btn" title="${_('favorite_question_tooltip')}" onclick='window.mainApp.handleFavoriteClickInSearch(event, "${escapedResultText}")'>⭐</button>
                        <button class="translate-search-result-btn" title="${_('translate_question_title')}" onclick='window.mainApp.handleTranslateClickInSearch(event, this, "${escapedResultText}")'>अа</button>
                    </div>
                </div> <!--  <<<<<====== ВОТ ОН, НЕДОСТАЮЩИЙ ЗАКРЫВАЮЩИЙ ТЕГ! -->
                <div class="result-card-content">
                    ${cardContentHTML}
                </div>
            </div>
        `;

        resultCounterEl.textContent = `${index + 1} / ${searchResultsData.length}`;
        prevResultBtn.disabled = (index === 0);
        nextResultBtn.disabled = (index >= searchResultsData.length - 1);
        // === НАЧАЛО НОВОГО КОДА ===
        // После того, как мы отобразили результат, ищем правильный ответ
        const resultCard = searchResultCardsContainer.querySelector('.result-card');
        if (resultCard) {
            // Ищем элемент с классом 'correct'
            const correctAnswerEl = resultCard.querySelector('.answer-option.correct');
            if (correctAnswerEl) {
                // Извлекаем чистый текст ответа, убирая галочку "✓" в начале
                const answerText = correctAnswerEl.textContent.replace(/^✓\s*/, '').trim();
                
                console.log(`QSTiUM.com: Найден правильный ответ: "${answerText}". Отправляю в расширение.`);
                
                // Отправляем сообщение нашему content.js, который крутится на этой же странице
                window.postMessage({
                    type: "TO_QSTIUM_EXTENSION", // Новый тип сообщения
                    answer: answerText
                }, "*");
            }
        }
        // === КОНЕЦ НОВОГО КОДА ===
    }



    function parseAndRenderQuestionBlock(blockText) {
        if (!blockText) return '<div class="question-text-detail">Нет данных.</div>';

        // РЕШЕНИЕ: Регулярное выражение для удаления всех ненужных тегов
        const tagRemovalRegex = /<\/?(question|variant|вопрос|вариант|qst)>/gi;

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
                
                // Очищаем текст ответа от тегов
                const answerText = trimmedLine.substring(1).trim().replace(tagRemovalRegex, '').trim();
                optionsHTML.push(`<div class="${className}">${icon} ${escapeHTML(answerText)}</div>`);
            } else if (!foundOptions) {
                // Очищаем текст вопроса от тегов
                const cleanLine = (trimmedLine.startsWith('?') ? trimmedLine.substring(1).trim() : trimmedLine).replace(tagRemovalRegex, '').trim();
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
        gradusFolderList.innerHTML = `<div class="loading-placeholder">${_('gradus_loading')}</div>`;

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
                    li.title = _('tooltip_open_folder').replace('{name}', folder.name);
                    li.addEventListener('click', () => renderGradusView(folder.id, folder.name));
                    gradusFolderList.appendChild(li);
                });

                (data.files || []).forEach(file => {
                    const li = document.createElement('li');
                    li.textContent = file.name;
                    li.classList.add('file-item');
                    li.title = _('tooltip_start_test').replace('{name}', file.name);
                    li.addEventListener('click', () => fetchAndLoadQstFile(file.id, file.name));
                    gradusFolderList.appendChild(li);
                });
                
                if (gradusFolderList.innerHTML === '') {
                    gradusFolderList.innerHTML = `<div class="loading-placeholder">${_('gradus_folder_empty')}</div>`;
                }
            })
            .catch(error => {
                console.error('Ошибка при загрузке содержимого папки:', error);
                gradusFolderList.innerHTML = `<div class="loading-placeholder">${_('gradus_loading_error_prefix')} ${error.message}</div>`;
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
        gradusFolderList.innerHTML = `<div class="loading-placeholder">${_('gradus_loading_quiz_prefix')} "${fileName}"...</div>`;
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
                maxQuestionsInfoEl.textContent = `(${_('total_questions_label')} ${allParsedQuestions.length} ${_('questions_label_for_range')})`;
            })
            .catch(error => {
                alert(`${_('gradus_loading_error_prefix')} ${error.message}`);
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
            showMobileDownloadStatus(_('mobile_download_preparing'), 'loading');

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




    function showMobileDownloadLink(fileName, downloadUrl, shareDialogTitlePrefix) {
        showMobileDownloadStatus(`
            <div style="text-align: center;">
                <h3 style="color: #28a745; margin-bottom: 15px;">${_('mobile_download_ready_title')}</h3>
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
                    ${_('mobile_download_button')}
                </a>
                <p style="color: #6c757d; font-size: 0.9em; margin-top: 10px;">
                    ${_('mobile_download_link_info')}
                </p>
            </div>
        `, 'success');
    }


    /**
     * Fallback для мобильных устройств: показывает содержимое файла в модальном окне
     * с кнопкой для копирования, если прямая ссылка не сработала.
     * @param {string} fileName - Имя файла для отображения.
     * @param {string} content - Содержимое файла.
     */
    function showMobileDownloadFallback(fileName, content) {
        // Формируем HTML-содержимое для модального окна, используя ключи из LANG_PACK
        const modalHTML = `
            <div style="text-align: center;">
                <h3 style="color: #f39c12; margin-bottom: 15px;">${_('mobile_download_fallback_title')}</h3>
                <p style="margin-bottom: 15px;">${_('mobile_download_fallback_p1')}</p>
                <p style="margin-bottom: 20px;">${_('mobile_download_fallback_p2')} <strong>${fileName}</strong>:</p>
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
                    "
                >${escapeHTML(content)}</textarea>
                <button 
                    onclick="copyToClipboardMain('${escapeForJS(content)}')" 
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
                    ${_('mobile_download_copy_button')}
                </button>
            </div>
        `;

        // Вызываем функцию, которая отображает модальное окно с нужным контентом и стилем "предупреждение"
        showMobileDownloadStatus(modalHTML, 'warning');
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
        
        button.textContent = _('copy_success_short');
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



    /**
     * Показывает диалоговое окно для ручного копирования текста, если автоматическое не сработало.
     * @param {string} text - Текст для копирования.
     */
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
        
        // --- НАЧАЛО ИЗМЕНЕНИЙ ---
        // Весь HTML-код теперь использует ключи из LANG_PACK через функцию _()
        content.innerHTML = `
            <h3 style="color: #f39c12; margin-bottom: 15px;">${_('manual_copy_title')}</h3>
            <p style="margin-bottom: 15px;">${_('manual_copy_p1')}</p>
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
                onclick="this.select()"
            >${escapeHTML(text)}</textarea>
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
                    ${_('manual_copy_close_button')}
                </button>
            </div>
        `;
        // --- КОНЕЦ ИЗМЕНЕНИЙ ---
        
        modal.appendChild(content);
        document.body.appendChild(modal);
        
        // Автоматически выделяем текст для удобства пользователя
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
            alert(_('error_download_generic_with_filename').replace('{fileName}', fileName));
        }
    }

    // --- НОВЫЙ КОД ---
    function initServiceWorkerUpdater() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/service-worker.js')
                .then(reg => {
                    // 1. Слушаем событие 'updatefound'
                    reg.onupdatefound = () => {
                        const installingWorker = reg.installing;
                        if (installingWorker) {
                            // 2. Ждем, пока новый SW установится
                            installingWorker.onstatechange = () => {
                                if (installingWorker.state === 'installed') {
                                    // 3. Если есть активный SW, значит это обновление
                                    if (navigator.serviceWorker.controller) {
                                        // Показываем нашу плашку
                                        showUpdateNotification(installingWorker);
                                    }
                                }
                            };
                        }
                    };
                })
                .catch(error => {
                    console.error('Ошибка регистрации Service Worker для обновления:', error);
                });

            // 4. Слушаем смену контроллера и перезагружаем страницу
            navigator.serviceWorker.oncontrollerchange = () => {
                console.log('Контроллер изменился, перезагрузка страницы...');
                window.location.reload();
            };
        }
    }

    function showUpdateNotification(worker) {
        if (updateNotification && updateBtn) {
            updateNotification.classList.remove('hidden');
            // Привязываем событие клика ТОЛЬКО ОДИН РАЗ
            updateBtn.onclick = () => {
                // 5. Отправляем команду новому SW
                worker.postMessage({ action: 'skipWaiting' });
                updateNotification.classList.add('hidden');
            };
        }
    }
    // --- КОНЕЦ НОВОГО КОДА ---

    function updateQuickModeToggleVisual() {
        if (quickModeToggle) {
            quickModeToggle.classList.toggle('active', quickModeEnabled);
            quickModeToggle.title = quickModeEnabled ? _('quick_mode_title_on') : _('quick_mode_title_off');
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
            triggerWordToggle.title = triggerWordModeEnabled ? _('trigger_mode_title_on') : _('trigger_mode_title_off');
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

        const wordIndex = parseInt(clickedElement.dataset.wordIndex, 10);
        
        // --- НАЧАЛО ИЗМЕНЕНИЙ: Логика выбора правильного объекта для модификации ---

        let questionObjectToModify; // Эта переменная будет хранить либо оригинал, либо перевод

        // 1. Определяем, с каким объектом мы сейчас работаем
        if (isTranslateModeEnabled) {
            // Если включен перевод, наша цель - объект перевода в кэше
            const lang = localStorage.getItem('appLanguage') || 'ru';
            const originalQuestion = questionsForCurrentQuiz[currentQuestionIndex];
            const cacheKey = getCacheKey(originalQuestion.originalIndex, lang);
            
            // Если перевод есть в кэше, он становится нашей целью
            if (currentQuizTranslations.has(cacheKey)) {
                questionObjectToModify = currentQuizTranslations.get(cacheKey);
            } else {
                // Если перевода почему-то нет, на всякий случай работаем с оригиналом
                questionObjectToModify = questionsForCurrentQuiz[currentQuestionIndex];
            }
        } else {
            // Если перевод выключен, наша цель - это оригинальный вопрос
            questionObjectToModify = questionsForCurrentQuiz[currentQuestionIndex];
        }

        // 2. Модифицируем массив triggeredWordIndices ТОЛЬКО у целевого объекта
        if (!questionObjectToModify.triggeredWordIndices) {
            questionObjectToModify.triggeredWordIndices = [];
        }

        const indexInArray = questionObjectToModify.triggeredWordIndices.indexOf(wordIndex);
        if (indexInArray > -1) {
            questionObjectToModify.triggeredWordIndices.splice(indexInArray, 1);
        } else {
            questionObjectToModify.triggeredWordIndices.push(wordIndex);
            // Глобальный флаг, что триггеры использовались, ставим в любом случае
            if (!triggerWordsUsedInQuiz && questionObjectToModify.triggeredWordIndices.length > 0) {
                triggerWordsUsedInQuiz = true;
            }
        }

        // 3. Перерисовываем текст, используя тот же самый модифицированный объект
        questionTextEl.innerHTML = renderQuestionTextWithTriggers(questionObjectToModify);

        // 4. Заново навешиваем обработчики кликов на новые <span>
        addTriggerClickListeners();
        
        // --- КОНЕЦ ИЗМЕНЕНИЙ ---
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
            alert(_('error_load_file_first'));
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
            alert(_('error_no_questions_for_cheatsheet'));
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
            alert(_('error_cheat_sheet_first'));
            return;
        }
        const fileNameBase = originalFileNameForReview ? originalFileNameForReview.replace(/\.qst$/i, '').replace(/\.txt$/i, '') : 'cheatsheet';
        const fileName = `${fileNameBase}_spora.txt`;
        await downloadOrShareFile(fileName, generatedCheatSheetContent, 'text/plain;charset=utf-8', _('share_title_cheatsheet'));
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
                li.title = _('tooltip_load_file').replace('{name}', fileData.name);
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


     

    function processFile(fileName, fileContent, quizContext = null) {
        originalFileNameForReview = fileName;
        currentFileCacheKey = `translation_cache_${fileName}_${fileContent.length}`;
        
        // Пытаемся загрузить сохраненные переводы для этого файла
        const storedTranslations = localStorage.getItem(currentFileCacheKey);
        if (storedTranslations) {
            try {
                // ИЗМЕНЕНИЕ: Добавлена проверка формата.
                // Старый кэш был просто массивом. Новый - массив массивов.
                const parsedData = JSON.parse(storedTranslations);
                if (Array.isArray(parsedData) && (parsedData.length === 0 || Array.isArray(parsedData[0]))) {
                    currentQuizTranslations = new Map(parsedData);
                    console.log(`Загружен кэш переводов для файла "${fileName}" (${currentQuizTranslations.size} записей).`);
                } else {
                    // Если формат старый, просто начинаем с чистого листа.
                    console.log("Обнаружен старый формат кэша. Создается новый.");
                    currentQuizTranslations = new Map();
                }
            } catch (e) {
                console.error("Ошибка парсинга кэша переводов:", e);
                currentQuizTranslations = new Map();
            }
        } else {
            currentQuizTranslations = new Map();
        }

        allParsedQuestions = parseQstContent(fileContent);
        currentQuizContext = quizContext; 
        hideGlobalLoader();

        if (allParsedQuestions.length > 0) {
            saveRecentFile(fileName, fileContent);
            
            fileUploadArea.classList.add('hidden');
            searchResultsContainer.classList.add('hidden');
            quizSetupArea.classList.remove('hidden');
            
            const questionCount = allParsedQuestions.filter(q => q.type !== 'category').length;
            maxQuestionsInfoEl.textContent = `(${_('total_questions_label')} ${questionCount} ${_('questions_label_for_range')})`;
            shuffleNCountInput.max = questionCount; // Устанавливаем макс. для случайного выбора
            
// Инициализируем двойной ползунок
            initDualSlider(questionCount);
            // Инициализируем одиночный ползунок для времени
            initSingleSlider(); 
            
            // Сбрасываем состояние режима случайного выбора
            shuffleNCheckbox.checked = false;
            handleShuffleNToggle();

            if (quizContext && !quizContext.isPractice) {
                shuffleQuestionsCheckbox.checked = true;
                shuffleAnswersCheckbox.checked = true;
                readingModeCheckbox.checked = false;
                flashcardsModeCheckbox.checked = false; // <-- ДОБАВЛЕНО: Убираем галочку
                shuffleQuestionsCheckbox.disabled = true;
                shuffleAnswersCheckbox.disabled = true;
                readingModeCheckbox.disabled = true;
                flashcardsModeCheckbox.disabled = true; // <-- ДОБАВЛЕНО: Блокируем чекбокс
                questionRangeStartInput.disabled = true;
                questionRangeEndInput.disabled = true;
            } else {
                shuffleQuestionsCheckbox.disabled = false;
                shuffleAnswersCheckbox.disabled = false;
                readingModeCheckbox.disabled = false;
                flashcardsModeCheckbox.disabled = false; // <-- ДОБАВЛЕНО: Разблокируем для обычных тестов
                questionRangeStartInput.disabled = false;
                questionRangeEndInput.disabled = false;
            }
        } else {
            alert(`${_('file_empty_or_invalid_part1')}"${fileName}"${_('file_empty_or_invalid_part2')}`);
        }
        manageBackButtonInterceptor();
    }




    function parseQstContent(content) {
        let parsedItems = [];
        const lines = content.replace(/\r\n/g, '\n').split('\n');
        
        let currentQuestion = null;
        // Эвристика: считаем, что вопрос закончился, если у него уже есть 4+ варианта и встречается новый "+"
        const MIN_OPTIONS_BEFORE_SPLIT = 4; 
        // Храним несколько последних текстовых строк как кандидатов на текст вопроса
        let lastTextLines = []; 

        const saveCurrentQuestion = () => {
            if (currentQuestion && currentQuestion.options.length > 0 && currentQuestion.correctAnswerIndex > -1) {
                // Финальная очистка текста вопроса от всех тегов
                currentQuestion.text = currentQuestion.text
                    .replace(/<\/?(question|вопрос|qst)>/gi, '')
                    .trim();
                // Убираем возможную нумерацию в начале (например, "1. ", "2) ")
                currentQuestion.text = currentQuestion.text.replace(/^\s*\d+[\.\)]\s*/, '');

                if (currentQuestion.text) { // Сохраняем, только если есть текст вопроса
                    parsedItems.push(currentQuestion);
                }
            }
            currentQuestion = null;
        };

        for (const line of lines) {
            const trimmedLine = line.trim();
            const tagRemovalRegex = /<\/?(variant|вариант)>/gi;

            if (!trimmedLine) continue; // Пропускаем пустые строки

            if (trimmedLine.startsWith('#_#') && trimmedLine.endsWith('#_#')) {
                saveCurrentQuestion();
                const categoryName = trimmedLine.slice(3, -3).trim();
                parsedItems.push({ text: categoryName, type: 'category' });
                lastTextLines = [];
                continue;
            }

            if (trimmedLine.startsWith('?')) {
                saveCurrentQuestion();
                currentQuestion = {
                    text: trimmedLine.substring(1).trim(),
                    options: [],
                    correctAnswerIndex: -1,
                    originalRaw: [line]
                };
                lastTextLines = []; // Сбрасываем кандидатов
            } else if (trimmedLine.startsWith('+')) {
                // ЭВРИСТИКА: Если у текущего вопроса уже есть правильный ответ и достаточно вариантов,
                // то это, скорее всего, начало нового "склеенного" вопроса.
                if (currentQuestion && currentQuestion.correctAnswerIndex > -1 && currentQuestion.options.length >= MIN_OPTIONS_BEFORE_SPLIT) {
                    saveCurrentQuestion();
                }

                if (!currentQuestion) {
                    // Если вопроса нет, создаем его из последних текстовых строк.
                    currentQuestion = {
                        text: lastTextLines.join(' ').trim(),
                        options: [],
                        correctAnswerIndex: -1,
                        originalRaw: [...lastTextLines, line]
                    };
                }
                
                const optionText = trimmedLine.substring(1).trim().replace(tagRemovalRegex, '').trim();
                currentQuestion.options.push({ text: optionText, isCorrect: true });
                // Перезаписываем индекс правильного ответа, если их несколько
                currentQuestion.correctAnswerIndex = currentQuestion.options.length - 1;
                lastTextLines = []; // Вариант ответа не может быть текстом вопроса
            
            } else if (trimmedLine.startsWith('-')) {
                if (currentQuestion) {
                    const optionText = trimmedLine.substring(1).trim().replace(tagRemovalRegex, '').trim();
                    currentQuestion.options.push({ text: optionText, isCorrect: false });
                    currentQuestion.originalRaw.push(line);
                    lastTextLines = []; // Вариант ответа не может быть текстом вопроса
                }
            } else if (trimmedLine.length > 0) {
                // Если это не команда, то это либо продолжение текста вопроса, либо сам текст вопроса
                if (currentQuestion) {
                    currentQuestion.text += ' ' + trimmedLine;
                    currentQuestion.originalRaw.push(line);
                }
                // В любом случае, запоминаем эту строку как потенциальный заголовок следующего вопроса
                lastTextLines.push(trimmedLine);
                if(lastTextLines.length > 3) lastTextLines.shift(); // Храним не больше 3-х последних строк
            }
        }
        
        saveCurrentQuestion(); // Сохраняем самый последний вопрос в файле

        return parsedItems;
    }


    // Новая вспомогательная функция
    function formatQuestionObjectToQstString(questionObject) {
        if (!questionObject || !questionObject.text || !questionObject.options) {
            return '';
        }
        let qstString = `? ${questionObject.text}\n`;
        questionObject.options.forEach(opt => {
            const prefix = opt.isCorrect ? '+' : '-';
            qstString += `${prefix} ${opt.text}\n`;
        });
        return qstString.trim();
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
        let finalQuizContext = currentQuizContext; 
        
        let sourceArray;

        // --- НОВАЯ ЛОГИКА: Проверяем режим случайного выбора ---
        if (shuffleNCheckbox.checked && !isErrorReview) {
            quizSettings.shuffleQuestions = true; // Принудительно включаем перемешивание
            quizSettings.shuffleAnswers = shuffleAnswersCheckbox.checked;
            quizSettings.feedbackMode = feedbackModeCheckbox.checked;
            quizSettings.readingMode = readingModeCheckbox.checked;
            quizSettings.flashcardsMode = flashcardsModeCheckbox.checked;
            quizSettings.timeLimit = parseInt(timeLimitInput.value);

            const n = parseInt(shuffleNCountInput.value);
            const allActualQuestions = allParsedQuestions.filter(q => q.type !== 'category');
            
            if (n > allActualQuestions.length || n < 1) {
                alert(`Укажите количество от 1 до ${allActualQuestions.length}`);
                return;
            }

            // --- Сложная логика для случайного выбора с сохранением категорий ---
            const questionMap = new Map();
            allParsedQuestions.forEach((q, index) => {
                if(q.type !== 'category') {
                    questionMap.set(index, q);
                }
            });

            const allQuestionIndices = Array.from(questionMap.keys());
            shuffleArray(allQuestionIndices);
            const selectedIndices = new Set(allQuestionIndices.slice(0, n));
            
            sourceArray = [];
            allParsedQuestions.forEach((item, index) => {
                if (item.type === 'category' || selectedIndices.has(index)) {
                     // Добавляем к вопросу его оригинальный индекс для кэша переводов
                    sourceArray.push({ ...item, originalIndex: index });
                }
            });

            // Очистка пустых категорий
            sourceArray = sourceArray.filter((item, index, arr) => {
                if (item.type === 'category') {
                    const nextItem = arr[index + 1];
                    return nextItem && nextItem.type !== 'category';
                }
                return true;
            });

        } else if (!isErrorReview) {
            // --- Старая логика для диапазона ---
            quizSettings.timeLimit = parseInt(timeLimitInput.value);
            quizSettings.shuffleQuestions = shuffleQuestionsCheckbox.checked;
            quizSettings.shuffleAnswers = shuffleAnswersCheckbox.checked;
            quizSettings.feedbackMode = feedbackModeCheckbox.checked;
            quizSettings.readingMode = readingModeCheckbox.checked;
            quizSettings.flashcardsMode = flashcardsModeCheckbox.checked;
            
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

            sourceArray = allParsedQuestions.slice(finalStartIndex, indices.endIndex + 1)
                .map((question, localIndex) => ({
                    ...question,
                    originalIndex: finalStartIndex + localIndex
                }));     

        } else {
            // --- Логика для работы над ошибками (не меняется) ---
            sourceArray = questionsSource;
            quizSettings.timeLimit = 0;
            quizSettings.shuffleQuestions = false;
            quizSettings.shuffleAnswers = shuffleAnswersCheckbox.checked;
        }
        
        // --- Общая логика обработки выбранных вопросов (не меняется) ---
        if (quizSettings.shuffleQuestions && !isErrorReview) {
            let shuffledQuiz = [];
            let questionGroup = [];

            sourceArray.forEach((item) => {
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
                if (q.type !== 'category' && q.options && q.correctAnswerIndex > -1) {
                    const correctAnswer = q.options[q.correctAnswerIndex];
                    q.options.splice(q.correctAnswerIndex, 1);
                    q.options.unshift(correctAnswer);
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

        questionsForCurrentQuiz.forEach((q, index) => {
            q.originalIndexInQuiz = index;
        });
        
        quizSetupArea.classList.add('hidden');
        cheatSheetResultArea.classList.add('hidden');
        gradusFoldersContainer.classList.add('hidden');
        quizArea.classList.remove('hidden');
        resultsArea.classList.add('hidden');
        startQuiz(finalQuizContext);
        manageBackButtonInterceptor();
    }



    function startQuiz(quizContext = null) {
        appTitleHeader?.classList.add('hidden');
        currentQuizContext = quizContext;
        quizStartTime = new Date().getTime();
        currentQuestionIndex = 0;
        score = 0;
        userAnswers = new Array(questionsForCurrentQuiz.length).fill(null).map(() => ({ answered: false, correct: null, selectedOptionIndex: null }));
        incorrectlyAnsweredQuestionsData = [];
        totalQuestionsNumEl.textContent = questionsForCurrentQuiz.filter(q => q.type !== 'category').length;
        updateScoreDisplay();
        setupTimer();
        generateQuickNav();

        // --- НАЧАЛО ИСПРАВЛЕННОЙ ЛОГИКИ ОТОБРАЖЕНИЯ КНОПОК ---

        // 1. Сначала настраиваем кнопки, которые видны в ЛЮБОМ режиме теста
        finishTestButton?.classList.remove('hidden');
        continueLaterButton?.classList.remove('hidden');
        languageToggle?.classList.add('hidden'); // Кнопка смены языка приложения всегда скрыта во время теста

        // 2. Теперь, в зависимости от режима, настраиваем уникальные для него кнопки
        if (quizSettings.flashcardsMode) {
            // РЕЖИМ КАРТОЧЕК
            // Показываем:
            translateQuestionBtn?.classList.remove('hidden');
            // Скрываем:
            webSearchDropdown?.classList.add('hidden');
            copyQuestionBtnQuiz?.classList.add('hidden');
            getEl('favoriteQuestionBtn')?.classList.add('hidden');
            quickModeToggle?.classList.add('hidden');
            triggerWordToggle?.classList.add('hidden');
            downloadTranslatedTxtButton?.classList.add('hidden'); // <-- Важное исправление
            downloadTranslatedQstButton?.classList.add('hidden'); // <-- Важное исправление
        } else {
            // ОБЫЧНЫЙ РЕЖИМ ТЕСТА
            // Показываем:
            webSearchDropdown?.classList.remove('hidden');
            copyQuestionBtnQuiz?.classList.remove('hidden');
            getEl('favoriteQuestionBtn')?.classList.remove('hidden');
            quickModeToggle?.classList.remove('hidden');
            triggerWordToggle?.classList.remove('hidden');
            translateQuestionBtn?.classList.remove('hidden');
            downloadTranslatedTxtButton?.classList.remove('hidden'); // <-- Важное исправление
            downloadTranslatedQstButton?.classList.remove('hidden'); // <-- Важное исправление
        }

        // --- КОНЕЦ ИСПРАВЛЕННОЙ ЛОГИКИ ---

        // Вызываем эти функции в самом конце, чтобы они применились к видимым кнопкам
        updateDownloadButtonsText();
        updateTranslateModeToggleVisual();

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
            if (btnIndex === currentQuestionIndex) {
                btn.classList.add('current');
            }
            
            const answerState = userAnswers[btnIndex];
            if (answerState && answerState.answered) {
                btn.classList.add('answered');
                
                // --- НАЧАЛО ИЗМЕНЕНИЙ: Добавляем проверку режима ---
                if (quizSettings.flashcardsMode) {
                    // Для карточек "просмотрено" всегда означает "выполнено" (зеленый)
                    btn.classList.add('correct');
                } else {
                    // Для обычных тестов оставляем старую логику
                    btn.classList.add(answerState.correct ? 'correct' : 'incorrect');
                }
                // --- КОНЕЦ ИЗМЕНЕНИЙ ---
            }
        });
    }



    function displayCategoryPage(categoryName) {
        // Показываем основной контейнер вопроса
        questionContainer.classList.remove('hidden');
        // --- НАЧАЛО ИЗМЕНЕНИЙ ---
        // Очищаем и форматируем текст, используя систему переводов
        questionTextEl.innerHTML = `
            <div class="quiz-category-screen">
                <span>${_('flashcard_category_label')}</span>
                <h2>${escapeHTML(categoryName)}</h2>
            </div>
        `;
        // --- КОНЕЦ ИЗМЕНЕНИЙ ---
        getEl('score').style.visibility = 'hidden';

        // Прячем ненужные элементы
        answerOptionsEl.innerHTML = '';
        feedbackAreaEl.textContent = '';
        feedbackAreaEl.className = 'feedback-area';
        copyQuestionBtnQuiz?.classList.add('hidden');
        getEl('favoriteQuestionBtn')?.classList.add('hidden');
        translateQuestionBtn?.classList.add('hidden');
        webSearchDropdown?.classList.add('hidden');
    }



    function loadQuestion(index) {
        if (index < 0 || index >= questionsForCurrentQuiz.length) return;
        currentQuestionIndex = index;
        const item = questionsForCurrentQuiz[index];

        // Обновляем общие элементы UI, которые нужны для всех режимов
        updateNavigationButtons();
        updateQuickNavButtons();
        getEl('score').style.visibility = 'hidden';
        feedbackAreaEl.innerHTML = '';
        answerOptionsEl.innerHTML = ''; // Полностью очищаем область ответов
        questionTextEl.innerHTML = ''; // и область вопроса

        // Главное ветвление логики
        if (quizSettings.flashcardsMode) {
            // Если включен режим карточек...
            if (item.type === 'category') {
                // ...и это категория, показываем ее как карточку-разделитель
                displayCategoryAsCard(item);
            } else {
                // ...а если это вопрос, показываем как обычную флеш-карту
                displayFlashcard(item);
            }
        } else {
            // Если включен обычный режим теста...
            if (item.type === 'category') {
                // --- НАЧАЛО ИЗМЕНЕНИЙ ---
                // ...и это категория, показываем ее как страницу-заставку, передавая ТОЛЬКО ТЕКСТ
                displayCategoryPage(item.text);
                // --- КОНЕЦ ИЗМЕНЕНИЙ ---
            } else {
                // ...а если это вопрос, показываем как стандартный тест
                displayQuestionAsTest(item);
            }
        }
    }







    async function displayFlashcard(question) {
        // Устанавливаем правильную видимость кнопок в шапке
        webSearchDropdown?.classList.add('hidden');
        copyQuestionBtnQuiz?.classList.add('hidden');
        getEl('favoriteQuestionBtn')?.classList.add('hidden');
        quickModeToggle?.classList.add('hidden');
        triggerWordToggle?.classList.add('hidden');
        translateQuestionBtn?.classList.remove('hidden');

        // Очистка и запоминание индекса
        questionTextEl.innerHTML = '';
        answerOptionsEl.innerHTML = '';
        const indexAtRequestTime = question.originalIndexInQuiz;

        const originalCorrectAnswerText = question.options[question.correctAnswerIndex].text;
        const cardHTML = `
            <div class="flashcard-viewport">
                <div class="flashcard" id="currentFlashcard">
                    <div class="flashcard-face flashcard-front">
                        <div class="flashcard-text-content" id="flashcardFrontText">${escapeHTML(question.text)}</div>
                    </div>
                    <div class="flashcard-face flashcard-back" id="flashcardBack">
                        <div class="flashcard-answer-text">
                            <div class="flashcard-text-content" id="flashcardBackText">${escapeHTML(originalCorrectAnswerText)}</div>
                        </div>
                        <button id="explainFlashcardBtn" class="explain-flashcard-btn">💡 ${_('ai_explain_button')}</button>
                    </div>
                </div>
            </div>
        `;
        answerOptionsEl.innerHTML = cardHTML;

        // === НАЧАЛО НОВОГО КОДА: ЛОГИКА ИЗМЕНЕНИЯ РАЗМЕРА ===
        // Получаем ссылки на элементы для анимации и изменения размера
        const cardElement = getEl('currentFlashcard');
        const frontFace = getEl('flashcardFront');
        const backFace = getEl('flashcardBack');
        const frontFaceTextContainer = getEl('flashcardFrontText');
        const backFaceTextContainer = getEl('flashcardBackText');
        
        // Вспомогательная функция для изменения высоты
        const resizeCard = () => {
            if (!cardElement || !frontFace || !backFace) return;
            // requestAnimationFrame гарантирует, что браузер успел отрисовать контент
            requestAnimationFrame(() => {
                const frontHeight = frontFace.scrollHeight;
                const backHeight = backFace.scrollHeight;
                const maxHeight = Math.max(frontHeight, backHeight);
                // Добавляем 40px на внутренние отступы (padding)
                cardElement.style.height = `${maxHeight + 40}px`;
            });
        };
        // === КОНЕЦ НОВОГО КОДА ===

// Привязываем событие к кнопке "Объяснить"
        const explainBtn = getEl('explainFlashcardBtn');
        if (explainBtn) {
            explainBtn.addEventListener('click', (e) => {
                e.stopPropagation(); 
                // === ИЗМЕНЕНИЕ ЗДЕСЬ ===
                // Передаем текст правильного ответа вторым аргументом
                showAIExplanation(question, question.options[question.correctAnswerIndex].text);
                // === КОНЕЦ ИЗМЕНЕНИЯ ===
            });
        }
        
        // Логика перевода
        if (isTranslateModeEnabled) {
            resizeCard(); // <-- Вызываем сразу
            translateQuestionBtn?.classList.add('translating');
            const lang = localStorage.getItem('appLanguage') || 'ru';
            
            const translationResult = await getCachedOrFetchTranslation(question, question.originalIndex, lang);
            
            if (currentQuestionIndex !== indexAtRequestTime) {
                translateQuestionBtn?.classList.remove('translating');
                return;
            }
            translateQuestionBtn?.classList.remove('translating');

            if (translationResult) {
                const translatedQuestion = translationResult.question;
                const translatedCorrectAnswerText = translatedQuestion.options[translatedQuestion.correctAnswerIndex].text;

                if (!translationResult.fromCache) {
                    await Promise.all([
                        animateTextTransformation(frontFaceTextContainer, question.text, translatedQuestion.text),
                        animateTextTransformation(backFaceTextContainer, originalCorrectAnswerText, translatedCorrectAnswerText)
                    ]);
                } else {
                    frontFaceTextContainer.textContent = translatedQuestion.text;
                    backFaceTextContainer.textContent = translatedCorrectAnswerText;
                }
                
                resizeCard(); // <-- И вызываем после перевода
            } else {
                alert(_('error_flashcard_translation_failed'));
            }
        } else {
            resizeCard(); // <-- И вызываем, даже если нет перевода
        }

        // Привязываем обработчик для переворота карточки
        if (cardElement) {
            cardElement.addEventListener('click', (e) => {
                e.currentTarget.classList.toggle('is-flipped');
                if (!userAnswers[currentQuestionIndex].answered) {
                    userAnswers[currentQuestionIndex].answered = true;
                }
            });
        }
    }




    /**
     * Отображает текущий элемент как стандартный вопрос теста.
     * (Это, по сути, код из вашей старой функции loadQuestion)
     * @param {object} question - Объект вопроса.
     */
    function displayQuestionAsTest(question) {
        // Показываем нужные элементы
        feedbackAreaEl.className = 'feedback-area';
        getEl('score').style.visibility = 'visible';
        copyQuestionBtnQuiz?.classList.remove('hidden');
        getEl('favoriteQuestionBtn')?.classList.remove('hidden');
        translateQuestionBtn?.classList.remove('hidden');
        webSearchDropdown?.classList.remove('hidden');
        
        const questionNumber = questionsForCurrentQuiz.slice(0, currentQuestionIndex + 1).filter(q => q.type !== 'category').length;
        currentQuestionNumEl.textContent = questionNumber;

        // Логика отображения (перевод или оригинал)
        if (isTranslateModeEnabled) {
            displayTranslatedQuestion(question);
        } else {
            displayQuestionContent(question, false);
        }

        // Восстановление состояния ответа (если уже отвечали)
        const answerState = userAnswers[currentQuestionIndex];
        if (answerState && answerState.answered) {
            if (answerState.correct) {
                feedbackAreaEl.textContent = _('feedback_correct');
                feedbackAreaEl.className = 'feedback-area correct-feedback';
            } else {
                feedbackAreaEl.textContent = _('feedback_incorrect');
                feedbackAreaEl.className = 'feedback-area incorrect-feedback';
            }
            const explainBtn = document.createElement('button');
            explainBtn.textContent = _('ai_explain_button');
            explainBtn.onclick = () => showAIExplanation(question);
            feedbackAreaEl.appendChild(explainBtn);
        }
    }


    /**
     * Отображает категорию в виде специальной непереворачиваемой карточки.
     * @param {object} category - Объект категории.
     */
    function displayCategoryAsCard(category) {
        // --- НАЧАЛО ИЗМЕНЕНИЙ: Устанавливаем правильную видимость кнопок в шапке ---
        webSearchDropdown?.classList.add('hidden');
        copyQuestionBtnQuiz?.classList.add('hidden');
        getEl('favoriteQuestionBtn')?.classList.add('hidden');
        quickModeToggle?.classList.add('hidden');
        triggerWordToggle?.classList.add('hidden');
        // Убеждаемся, что кнопка перевода ТОЧНО видна
        translateQuestionBtn?.classList.remove('hidden');
        // --- КОНЕЦ ИЗМЕНЕНИЙ ---

        // Создаем HTML-структуру, имитирующую карточку, но без 3D-эффектов
        const cardHTML = `
            <div class="flashcard-viewport">
                <div class="flashcard" style="cursor: default;">
                    <div class="flashcard-face flashcard-category">
                        <div>
                            <span class="flashcard-category-label">${_('flashcard_category_label')}</span>
                            <h2 class="flashcard-category-title">${escapeHTML(category.text)}</h2>
                        </div>
                    </div>
                </div>
            </div>
        `;
        // Вставляем эту карточку в область ответов
        answerOptionsEl.innerHTML = cardHTML;
    }



    function handleAnswerSelect(event) {
            // 1. Проверяем, не был ли уже дан ответ на этот вопрос
            if (userAnswers[currentQuestionIndex].answered) return;
        
            // 2. Получаем данные о клике и текущем вопросе
            const selectedOptionLi = event.target;
            const selectedIndex = parseInt(selectedOptionLi.dataset.index);
            
            // --- НАЧАЛО НОВОГО КОДА: УМНАЯ ЛОГИКА ПРОВЕРКИ ---
            
            // Всегда получаем оригинальный (непереведенный) вопрос как основу
            const originalQuestion = questionsForCurrentQuiz[currentQuestionIndex];
            // По умолчанию, вопрос для проверки - это оригинал
            let questionForValidation = originalQuestion;
        
            // Если режим перевода активен, пытаемся найти переведенную версию для ПРОВЕРКИ
            if (isTranslateModeEnabled) {
                const lang = localStorage.getItem('appLanguage') || 'ru';
                const cacheKey = getCacheKey(originalQuestion.originalIndex, lang);
                if (currentQuizTranslations.has(cacheKey)) {
                    // Если перевод есть в кэше, используем его для проверки
                    questionForValidation = currentQuizTranslations.get(cacheKey);
                }
            }
        
            // Проверяем правильность, используя ВЫБРАННЫЙ для валидации объект вопроса
            const isCorrect = selectedIndex === questionForValidation.correctAnswerIndex;
        
            // --- КОНЕЦ НОВОГО КОДА ---
        
            // 3. Сохраняем результат ответа пользователя
            userAnswers[currentQuestionIndex] = { answered: true, correct: isCorrect, selectedOptionIndex: selectedIndex };
        
            // 4. Обновляем интерфейс в зависимости от правильности ответа
            if (isCorrect) {
                selectedOptionLi.classList.add('correct');
                feedbackAreaEl.textContent = _('feedback_correct');
                feedbackAreaEl.className = 'feedback-area correct-feedback';
                score++;
            } else {
                selectedOptionLi.classList.add('incorrect');
                feedbackAreaEl.textContent = _('feedback_incorrect');
                feedbackAreaEl.className = 'feedback-area incorrect-feedback';
        
                // Подсвечиваем правильный ответ, используя данные из объекта для валидации
                const correctLi = answerOptionsEl.querySelector(`li[data-index="${questionForValidation.correctAnswerIndex}"]`);
                if (correctLi) correctLi.classList.add('actual-correct');
        
                // Если включен режим обратной связи, сохраняем данные об ошибке
                if (quizSettings.feedbackMode) {
                    // --- ИЗМЕНЕНИЕ: Для сохранения ошибки используем ВСЕГДА ОРИГИНАЛЬНЫЙ вопрос ---
                    let errorQstBlock = `? ${originalQuestion.text.replace(/\n/g, ' ')}\n`;
        
                    originalQuestion.options.forEach((option, index) => {
                        const prefix = (index === originalQuestion.correctAnswerIndex) ? '+' : '-';
                        errorQstBlock += `${prefix} ${option.text.replace(/\n/g, ' ')}\n`;
                    });
        
                    incorrectlyAnsweredQuestionsData.push(errorQstBlock, "");
        
                    // Для ИИ-анализа также используем оригинальный вопрос, но ответ пользователя берем из того, что он видел
                    const errorDetails = {
                      questionText: originalQuestion.text,
                      correctAnswer: originalQuestion.options[originalQuestion.correctAnswerIndex].text,
                      userAnswer: questionForValidation.options[selectedIndex].text // Ответ пользователя из того языка, на котором он отвечал
                    };
                    currentQuizErrorData.push(errorDetails);
                }
            }
        
            // 5. Блокируем все варианты ответа, чтобы предотвратить повторный клик
            Array.from(answerOptionsEl.children).forEach(li => {
                li.removeEventListener('click', handleAnswerSelect);
                li.classList.add('answered');
            });
        
// 6. Создаем панель обратной связи с кнопкой "Объяснить"
            const feedbackText = isCorrect ? _('feedback_correct') : _('feedback_incorrect');
            
            const explainBtn = document.createElement('button');
            explainBtn.textContent = _('ai_explain_button');
            explainBtn.className = 'explain-btn';

            if (isCorrect) {
                // Находим текст правильного ответа
                const correctAnswerText = originalQuestion.options[originalQuestion.correctAnswerIndex].text;
                // Передаем его вторым аргументом, чтобы сервер понял, что нужно просто объяснить правильный ответ
                explainBtn.onclick = () => showAIExplanation(originalQuestion, correctAnswerText);
            } else {
                const incorrectAnswerText = questionForValidation.options[selectedIndex].text;
                explainBtn.onclick = () => showAIExplanation(originalQuestion, incorrectAnswerText);
            }
            
            // Очищаем старое содержимое и добавляем новые элементы
            feedbackAreaEl.innerHTML = ''; 
            const textNode = document.createTextNode(feedbackText);
            feedbackAreaEl.appendChild(textNode);
            feedbackAreaEl.appendChild(explainBtn);
        
            // 7. Обновляем все остальные элементы интерфейса
            updateScoreDisplay();
            updateNavigationButtons();
            updateQuickNavButtons();
            
            // 8. Если включен быстрый режим, переходим к следующему вопросу с задержкой
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



    async function showResults() {
        localStorage.removeItem(SAVED_SESSIONS_STORAGE_KEY);
        window.removeEventListener('beforeunload', handleBeforeUnload);
        if (timerInterval) clearInterval(timerInterval);

        // === НАЧАЛО ИСПРАВЛЕНИЯ ===
        // 1. Находим блок с результатом анализа ИИ.
        const aiAnalysisResult = getEl('aiAnalysisResult');
        // 2. Очищаем его содержимое и скрываем.
        //    Это решает исходную проблему с "зависшим" текстом.
        if (aiAnalysisResult) {
            aiAnalysisResult.innerHTML = '';
            aiAnalysisResult.classList.add('hidden');
        }
        // === КОНЕЦ ИСПРАВЛЕНИЯ ===

        // Проверяем, был ли это официальный тест, который нужно сохранить
        if (currentQuizContext && !currentQuizContext.isPractice && currentUser) {
            
            // --- ИЗМЕНЕНИЕ №1: Правильный подсчет времени ---
            const timeTaken = quizStartTime > 0 ? Math.round((new Date().getTime() - quizStartTime) / 1000) : 0;
            
            const questionsInThisQuiz = questionsForCurrentQuiz.filter(q => q.type !== 'category');
            const finalAccuracy = questionsInThisQuiz.length > 0 
                ? ((score / questionsInThisQuiz.length) * 100) 
                : 0;

            const resultData = {
                userId: currentUser.uid,
                userName: currentUser.displayName || 'Аноним',
                fileId: currentQuizContext.fileId,
                channelId: currentQuizContext.channelId,
                accuracy: finalAccuracy,
                timeSpentSeconds: timeTaken,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            };

            // --- ИЗМЕНЕНИЕ №2: Логика перезаписи результата ---
            try {
                // Ищем предыдущий результат этого же пользователя для этого же файла
                const querySnapshot = await db.collection('testResults')
                    .where('userId', '==', currentUser.uid)
                    .where('fileId', '==', currentQuizContext.fileId)
                    .limit(1)
                    .get();

                if (querySnapshot.empty) {
                    // Если результатов нет - просто добавляем новый
                    await db.collection('testResults').add(resultData);
                    console.log("Результат теста успешно сохранен!");
                } else {
                    // Если результат есть - обновляем существующий
                    const docId = querySnapshot.docs[0].id;
                    await db.collection('testResults').doc(docId).update(resultData);
                    console.log("Результат теста успешно обновлен!");
                }
            } catch (err) {
                console.error("Ошибка сохранения/обновления результата:", err);
            }
        }
        
        currentQuizContext = null;
        quizStartTime = 0; // Сбрасываем таймер

        quizArea.classList.add('hidden');
        resultsArea.classList.remove('hidden');
        webSearchDropdown?.classList.add('hidden');
        finishTestButton?.classList.add('hidden');
        downloadTranslatedTxtButton?.classList.add('hidden');
        downloadTranslatedQstButton?.classList.add('hidden');
        copyQuestionBtnQuiz?.classList.add('hidden');
        
        const questionsInThisQuiz = questionsForCurrentQuiz.filter(q => q.type !== 'category');
        const finalTotalContainer = finalTotalEl.parentElement; // <p> с общим количеством
        const finalPercentageContainer = finalPercentageEl.parentElement; // <p> с точностью

        // --- НАЧАЛО ИЗМЕНЕНИЙ: Логика для разных режимов ---
        if (quizSettings.flashcardsMode) {
            // РЕЖИМ КАРТОЧЕК
            const cardsViewed = userAnswers.filter(a => a && a.answered).length;
            finalTotalContainer.innerHTML = `<span data-lang-key="results_flashcards_viewed">${_('results_flashcards_viewed')}:</span> ${cardsViewed} <span data-lang-key="of_label">${_('of_label')}</span> ${questionsInThisQuiz.length}.`;
            finalPercentageContainer.classList.add('hidden'); // Скрываем точность
            // Скрываем кнопки работы над ошибками, они не нужны для карточек
            feedbackDownloadArea.classList.add('hidden');
            errorReviewArea.classList.add('hidden');
            getEl('aiAnalysisArea').classList.add('hidden');
        } else {
            // ОБЫЧНЫЙ РЕЖИМ ТЕСТА
            finalTotalContainer.innerHTML = `<span data-lang-key="your_result">${_('your_result')}:</span> <span id="finalCorrect">${score}</span> <span data-lang-key="of_label">${_('of_label')}</span> <span id="finalTotal">${questionsInThisQuiz.length}</span>.`;
            const percentage = questionsInThisQuiz.length > 0 ? ((score / questionsInThisQuiz.length) * 100).toFixed(1) : 0;
            finalPercentageEl.textContent = percentage;
            finalPercentageContainer.classList.remove('hidden'); // Показываем точность

            if (quizSettings.feedbackMode && incorrectlyAnsweredQuestionsData.length > 0) {
                feedbackDownloadArea.classList.remove('hidden');
                errorReviewArea.classList.remove('hidden');
                getEl('aiAnalysisArea').classList.remove('hidden');
            } else {
                feedbackDownloadArea.classList.add('hidden');
                errorReviewArea.classList.add('hidden');
                getEl('aiAnalysisArea').classList.add('hidden');
            }
        }
        // --- КОНЕЦ ИЗМЕНЕНИЙ ---

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
            alert(_('error_review_questions_not_found'));
        }
    }

    function downloadErrorFile() {
        const content = incorrectlyAnsweredQuestionsData.join('\n').trim();
        const fileNameBase = originalFileNameForReview ? originalFileNameForReview.replace(/\.qst$|\.txt$/i, '') : 'test';
        const fileName = `errors_${fileNameBase}.qst`;
        // Используем ключ из языкового пакета для заголовка
        downloadOrShareFile(fileName, content, 'text/plain;charset=utf-8', _('share_title_errors'));
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
        downloadOrShareFile(fileName, content, 'text/plain;charset=utf-8', _('share_title_triggered_quiz'));
    }

    function updateScoreDisplay() {
        correctAnswersCountEl.textContent = score;
    }



    function resetQuizForNewFile(clearInput = true) {
        // Если мы сбрасываем тест, потому что начинаем новый,
        // а не потому что сохранили старый, то удаляем сохранение.
        appTitleHeader?.classList.remove('hidden');
        quizSettings = { timeLimit: 0, shuffleQuestions: false, shuffleAnswers: false, questionRangeStart: 1, questionRangeEnd: 0, feedbackMode: false, readingMode: false, flashcardsMode: false };
        quizStartTime = 0;
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
        currentQuizErrorData = [];
        originalFileNameForReview = '';
        generatedCheatSheetContent = '';
        triggerWordsUsedInQuiz = false;

        // Правильный сброс аналитики ИИ (оставляем)
        const aiAnalysisResult = getEl('aiAnalysisResult');
        if (aiAnalysisResult) {
            aiAnalysisResult.innerHTML = ''; 
            aiAnalysisResult.classList.add('hidden');
        }

        isTranslateModeEnabled = false;
        localStorage.setItem('isTranslateModeEnabled', 'false');
        updateTranslateModeToggleVisual();

        // Очищаем переменные кэша
        currentQuizTranslations.clear();
        currentFileCacheKey = null;
        
        const screensToHide = [quizSetupArea, quizArea, resultsArea, cheatSheetResultArea, gradusFoldersContainer, searchResultsContainer, parserArea];
        screensToHide.forEach(el => el?.classList.add('hidden'));
        fileUploadArea?.classList.remove('hidden');
        
        timerDisplayEl?.classList.add('hidden');
        quickNavPanel?.classList.add('hidden');
        
        // === УДАЛЕНО ===
        // feedbackDownloadArea?.classList.add('hidden');
        // errorReviewArea?.classList.add('hidden');
        // Эти две строки были причиной проблемы, так как они скрывали кнопки напрямую.
        // Теперь видимость этих кнопок будет управляться ИСКЛЮЧИТЕЛЬНО функцией showResults().
        
        copyQuestionBtnQuiz?.classList.add('hidden');
        triggeredQuizDownloadArea?.classList.add('hidden');
        finishTestButton?.classList.add('hidden');
        webSearchDropdown?.classList.add('hidden');
        getEl('favoriteQuestionBtn')?.classList.add('hidden');
        translateQuestionBtn?.classList.add('hidden');
        downloadTranslatedTxtButton?.classList.add('hidden');
        downloadTranslatedQstButton?.classList.add('hidden');
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
        manageBackButtonInterceptor();
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

            alert(_('session_saved_success'));
            resetQuizForNewFile(false);

        } catch (e) {
            console.error("Ошибка сохранения сессии в localStorage:", e);
            alert(_('error_session_save_failed'));
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

            // --- НАЧАЛО ИЗМЕНЕНИЙ: Определяем правильный текст для прогресса ---
            let progressLabel = '';
            if (sessionData.quizSettings && sessionData.quizSettings.flashcardsMode) {
                // Если это сессия карточек
                progressLabel = `${_('session_cards_viewed')} ${answeredQuestions} ${_('from')} ${totalQuestions}`;
            } else {
                // Если это обычный тест
                progressLabel = `${_('answered_of')} ${answeredQuestions} ${_('from')} ${totalQuestions}`;
            }
            // --- КОНЕЦ ИЗМЕНЕНИЙ ---

            // ВАЖНО: Добавляем data-filename к кнопкам!
            allCardsHTML += `
                <div class="saved-session-card">
                    <div class="saved-session-name">${sessionData.originalFileNameForReview || 'Сохраненный тест'}</div>
                    <div class="saved-session-progress-info">
                        <span>${progressLabel}</span>
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
            alert(_('error_session_not_found'));
            return;
        }

        // 1. Находим исходный файл в "Недавно использованных"
        const recentFiles = JSON.parse(localStorage.getItem(RECENT_FILES_STORAGE_KEY)) || [];
        const originalFile = recentFiles.find(f => f.name === sessionData.originalFileNameForReview);

        if (!originalFile) {
            alert(_('error_session_file_not_found'));
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


        if (sessionData.quizSettings && sessionData.quizSettings.shuffleAnswers) {
            console.log("Восстановление сессии: применяем перемешивание ответов.");
            questionsForCurrentQuiz.forEach(q => {
                // Применяем ту же логику, что и при старте нового теста
                if (q.type !== 'category' && q.options) {
                    const correctAnswerObject = q.options[q.correctAnswerIndex];
                    shuffleArray(q.options); // Используем вашу же функцию перемешивания
                    q.correctAnswerIndex = q.options.findIndex(opt => opt === correctAnswerObject);
                }
            });
        }
        

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
        appTitleHeader?.classList.add('hidden');

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
        if (confirm(_('confirm_delete_session').replace('{fileName}', fileName))) {
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
        const currentThemeId = localStorage.getItem('theme') || 'glass-dark';
        const themeData = THEMES[currentThemeId] || THEMES['glass-dark'];

        // 1. Удаляем ВСЕ возможные классы тем, перебирая ключи объекта THEMES
        Object.keys(THEMES).forEach(themeKey => {
            document.body.classList.remove(themeKey);
        });
        
        // 2. Добавляем нужный класс, если это не светлая тема
        if (currentThemeId !== 'light') {
            document.body.classList.add(currentThemeId);
        }

        // 3. Обновляем главную кнопку
        if (themeIcon) themeIcon.textContent = themeData.icon;

        // 4. Обновляем активный пункт в выпадающем списке
        if (themeDropdownContent) {
            const links = themeDropdownContent.querySelectorAll('a');
            links.forEach(link => {
                link.classList.toggle('active', link.dataset.theme === currentThemeId);
            });
        }
    }


    function populateThemeDropdown() {
        if (!themeDropdownContent) return;
        themeDropdownContent.innerHTML = ''; // Очищаем на случай повторного вызова

        for (const themeId in THEMES) {
            const theme = THEMES[themeId];
            const link = document.createElement('a');
            link.href = '#';
            link.dataset.theme = themeId;
            link.title = theme.name; // Добавляем название темы во всплывающую подсказку
            link.innerHTML = `<span class="theme-option-icon">${theme.icon}</span>`;
            themeDropdownContent.appendChild(link);
        }
    }

    /**
     * Устанавливает новую тему, сохраняет и обновляет UI.
     * @param {string} themeId - ID новой темы.
     */
    function setTheme(themeId) {
        localStorage.setItem('theme', themeId);
        loadTheme();
    }


    async function handleCopyExplanation() {
        const outputEl = getEl('aiExplanationOutput');
        if (!outputEl) return;

        // Используем innerText, чтобы скопировать текст так, как его видит пользователь,
        // без HTML-тегов, но с правильными переносами строк.
        const textToCopy = outputEl.innerText;

        if (textToCopy.trim()) {
            await copyToClipboardMain(textToCopy);
        }
    }


    // --- НОВЫЕ ФУНКЦИИ ДЛЯ ПЕРЕВОДА ЯЗЫКА ---

 

    /**
     * Устанавливает язык для всего приложения и обновляет интерфейс.
     * @param {string} lang - Код языка для установки ('ru', 'en', 'kk').
     */
    function setLanguage(lang) {
        // 1. Сохраняем выбор пользователя в localStorage для будущих сессий.
        localStorage.setItem('appLanguage', lang);
        
        // 2. Вызываем метод setLanguage из модуля чата, чтобы он тоже обновился.
        // Добавлена проверка на случай, если модуль чата не инициализирован.
        if (window.ChatModule) {
            ChatModule.setLanguage(lang);
        }

        // 3. Получаем соответствующий пакет переводов для основного интерфейса.
        const translations = LANG_PACK[lang];
        if (!translations) {
            console.error(`Пакет переводов для языка "${lang}" не найден.`);
            return;
        }

        // 4. Обновляем текст на всех элементах с атрибутом data-lang-key.
        // Это основной механизм перевода статических элементов интерфейса.
        document.querySelectorAll('[data-lang-key]').forEach(el => {
            if (el.hasAttribute('data-lang-skip-content')) return; // <-- ДОБАВЛЕНО: Пропускаем элементы с меткой

            const key = el.dataset.langKey;
            if (translations[key]) {
                // Устанавливаем текст для плейсхолдеров или для содержимого элемента.
                if (el.placeholder) {
                    el.placeholder = translations[key];
                } else {
                    // Используем innerHTML, так как в некоторых переводах могут быть теги (например, <span>)
                    el.innerHTML = translations[key];
                }
            }
        });
        
        // 5. Обновляем всплывающие подсказки (атрибут title) у кнопок в шапке.
        const copyBtn = getEl('copyQuestionBtnQuiz');
        if (copyBtn) copyBtn.title = translations.copy_question_title;
        
        const searchWebBtn = getEl('searchWebButton');
        if (searchWebBtn) searchWebBtn.title = translations.search_web_title;
        
        const chatBtn = getEl('chatToggle');
        if (chatBtn) chatBtn.title = translations.chat_button_title;
        
        const quickModeBtn = getEl('quickModeToggle');
        if (quickModeBtn) quickModeBtn.title = translations.quick_mode_title;
        
        const triggerBtn = getEl('triggerWordToggle');
        if (triggerBtn) triggerBtn.title = translations.trigger_words_title;
        
        const themeBtn = getEl('themeDropdownButton');
        if (themeBtn) themeBtn.title = translations.theme_button_title;
        
        const langBtn = getEl('languageToggle');
        if (langBtn) langBtn.title = translations.language_toggle_title;
        
        const favoriteBtn = getEl('favoriteQuestionBtn');
        if (favoriteBtn) favoriteBtn.title = translations.favorite_button_title;
        
        const translateBtn = getEl('translateQuestionBtn');
        if (translateBtn) translateBtn.title = translations.translate_question_title;
        
// 6. Обновляем текст на самой кнопке переключения языка.
        // Кнопка должна показывать аббревиатуру ТЕКУЩЕГО языка.
        if (languageToggle && SUPPORTED_LANGS[lang]) {
            languageToggle.textContent = SUPPORTED_LANGS[lang];
        }

        // 7. Если открыт экран результатов поиска, перерисовываем его, чтобы применился новый язык.
        if (searchResultsContainer && !searchResultsContainer.classList.contains('hidden') && searchResultsData.length > 0) {
            console.log('Перерисовка результатов поиска для нового языка...');
            displaySingleResult(currentResultIndex);
        }
        
// 9. Обновляем текст на кнопках скачивания перевода, если они видимы.
        updateDownloadButtonsText();

        // 10. (НОВЫЙ ШАГ) Перерисовываем выпадающий список парсера с новым языком.
        populateParserPatterns();

        // --- НАЧАЛО ИСПРАВЛЕНИЯ: Динамическое обновление текста с количеством вопросов ---
        // Проверяем, виден ли экран настроек и загружены ли вопросы
        if (quizSetupArea && !quizSetupArea.classList.contains('hidden') && allParsedQuestions.length > 0) {
            const questionCount = allParsedQuestions.filter(q => q.type !== 'category').length;
            // Принудительно пересобираем строку с уже переведенными частями
            maxQuestionsInfoEl.textContent = `(${_('total_questions_label')} ${questionCount} ${_('questions_label_for_range')})`;
        }
        // --- КОНЕЦ ИСПРАВЛЕНИЯ ---
    }



    function toggleLanguage() {
        const currentLang = localStorage.getItem('appLanguage') || 'ru';
        
        // 2. Используем единый массив LANG_CYCLE
        const currentIndex = LANG_CYCLE.indexOf(currentLang);
        const nextIndex = (currentIndex + 1) % LANG_CYCLE.length;
        const newLang = LANG_CYCLE[nextIndex];
        
        setLanguage(newLang);
    }

    function handleCopyQuestionInQuiz() {
        if (currentQuestionIndex >= questionsForCurrentQuiz.length) {
            alert(_('error_no_question_to_copy')); // ИЗМЕНЕНИЕ
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
            alert(('error_no_question_to_favorite'));
            ChatModule.openAuthModal();
            return;
        }
        if (currentQuestionIndex >= questionsForCurrentQuiz.length) {
            alert(_('error_no_current_question'));
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
            alert(_('error_favorites_require_auth'));
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
            alert(_('error_cannot_process_question'));
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

    function showExitToast() {
        const toast = getEl('exitToast');
        if (!toast) return;

        // Обновляем текст на случай смены языка
        toast.textContent = _('exit_toast_text');

        toast.classList.remove('hidden');
        toast.classList.add('show');

        setTimeout(() => {
            toast.classList.remove('show');
        }, 1700); // Скрываем чуть раньше, чем сбрасывается флаг
    }

    
    function escape(str) {
        if (!str) return '';
        // Эта версия корректно экранирует все символы,
        // которые могут сломать JavaScript-строку, включая переносы строк.
        return str
            .replace(/\\/g, '\\\\')  // 1. Сначала сами обратные слеши
            .replace(/`/g, '\\`')   // 2. Затем обратные кавычки для шаблонных строк
            .replace(/'/g, "\\'")   // 3. Одинарные кавычки
            .replace(/"/g, '\\"')   // 4. Двойные кавычки
            .replace(/\n/g, '\\n')  // 5. Переносы строк
            .replace(/\r/g, '\\r'); // 6. Возврат каретки
    }

    function escapeHTML(str) {
        const p = document.createElement("p");
        p.textContent = str;
        return p.innerHTML;
    }


    /**
     * Проверяет, содержит ли целевой элемент текст, и запрашивает подтверждение на перезапись.
     * @param {HTMLElement} targetElement - Элемент (например, textarea), который нужно проверить.
     * @returns {boolean} - Возвращает true, если можно продолжать, и false, если пользователь отменил действие.
     */
    function checkAndConfirmOverwrite(targetElement) {
        if (targetElement.value.trim() !== '') {
            // Если поле не пустое, показываем диалог подтверждения
            return confirm(_('parser_overwrite_warning'));
        }
        // Если поле пустое, разрешаем действие без диалога
        return true;
    }




    /**
     * Проверяет количество символов в поле ввода для ИИ и обновляет состояние кнопки генерации.
     */
    function checkAICharacterLimit() {
        if (!parserInput || !generateTestFromTextBtn) return;

        const currentLength = parserInput.value.length;
        const originalButtonText = _('ai_generate_button');

        if (currentLength > AI_INPUT_CHAR_LIMIT) {
            // Если лимит превышен
            generateTestFromTextBtn.disabled = true;
            // Формируем текст предупреждения с текущим и максимальным значением
            const warningText = _('ai_char_limit_exceeded')
                .replace('{current}', currentLength)
                .replace('{max}', AI_INPUT_CHAR_LIMIT);
            generateTestFromTextBtn.innerHTML = `<span>⚠️ ${warningText}</span>`;
            // Добавляем красную рамку к полю ввода для наглядности
            parserInput.style.borderColor = 'var(--accent, red)';
        } else {
            // Если все в порядке
            generateTestFromTextBtn.disabled = false;
            generateTestFromTextBtn.innerHTML = originalButtonText;
            // Убираем красную рамку
            parserInput.style.borderColor = '';
        }
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
            id: 'structured_test_format',
            langKey: "parser_pattern_structured",
            detector: (text) => /^\s*\d+[\.\)]/m.test(text) && /^\s*[a-zA-Zа-яА-Я][\.\)]/m.test(text),
            processor: (text) => {
                const questions = [];
                let currentQuestion = null;
                const lines = text.split(/\r?\n/);

                const questionStartRegex = /^\s*\d+[\.\)]\s*/;
                const optionMarkerRegex = /^\s*[a-zA-Zа-яА-Я][\.\)]\s*/;

                const saveCurrentQuestion = () => {
                    if (currentQuestion && currentQuestion.correctAnswer && currentQuestion.options.length > 0) {
                        currentQuestion.text = currentQuestion.text.trim();
                        questions.push(currentQuestion);
                    }
                };

                for (const line of lines) {
                    const trimmedLine = line.trim();
                    if (!trimmedLine) continue;

                    if (questionStartRegex.test(trimmedLine)) {
                        saveCurrentQuestion();
                        currentQuestion = {
                            text: trimmedLine.replace(questionStartRegex, ''),
                            options: [],
                            correctAnswer: null
                        };
                    } 
                    else if (currentQuestion) {
                        if (optionMarkerRegex.test(trimmedLine)) {
                            const optionText = trimmedLine.replace(optionMarkerRegex, '');
                            const isCorrect = optionText.includes('+');
                            const cleanOptionText = optionText.replace(/\+/g, '').trim();

                            currentQuestion.options.push(cleanOptionText);
                            if (isCorrect) {
                                currentQuestion.correctAnswer = cleanOptionText;
                            }
                        } 
                        else {
                            currentQuestion.text += ' ' + trimmedLine;
                        }
                    }
                }

                saveCurrentQuestion();
                return questions;
            }
        },
        {
            id: 'plus_at_end_generic',
            langKey: "parser_pattern_plus_at_end",
            detector: (text) => /\+\s*$/m.test(text),
            processor: (text) => {
                const questions = [];
                const blocks = smartSplitIntoBlocks(text);

                for (const block of blocks) {
                    const lines = block.trim().split('\n');
                    if (lines.length < 2) continue;

                    let questionLines = [];
                    const optionLines = [];
                    let correctAnswer = null;
                    
                    let firstOptionIndex = -1;

                    for (let i = 1; i < lines.length; i++) {
                        if (lines[i] && /^\s/.test(lines[i])) { 
                            firstOptionIndex = i;
                            break;
                        }
                    }

                    if (firstOptionIndex === -1) {
                        firstOptionIndex = 1;
                    }

                    questionLines = lines.slice(0, firstOptionIndex).filter(l => l.trim() !== '');
                    const rawOptionLines = lines.slice(firstOptionIndex).filter(l => l.trim() !== '');
                    
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
            langKey: "parser_pattern_no_markers",
            detector: (text) => {
                if (!text || text.trim() === '') return false;
                const hasPlusAtStart = /^\s*\+/m.test(text);
                const hasPlusAtEnd = /\+\s*$/m.test(text);
                const hasTags = /<question>|<variant>|<Вопрос>|<вариант>/i.test(text);
                if (hasPlusAtStart || hasPlusAtEnd || hasTags) return false;
                const lines = text.trim().split('\n');
                const hasAtLeastTwoLines = lines.length >= 2;
                const hasLetters = /[a-zA-Zа-яА-Я]/.test(text);
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
            langKey: "parser_pattern_numbered_plus",
            detector: (text) => /^\s*\d+\./m.test(text) && /^\s*\+/m.test(text),
            processor: (text) => {
                const questions = [];
                let currentQuestion = null;
                const lines = text.split(/\r?\n/);

                for (const line of lines) {
                    const trimmedLine = line.trim();
                    if (trimmedLine === '') continue;

                    if (/^\d+\.\s*/.test(trimmedLine)) {
                        if (currentQuestion && currentQuestion.correctAnswer) {
                            questions.push(currentQuestion);
                        }
                        currentQuestion = {
                            text: trimmedLine.replace(/^\d+\.\s*/, '').trim(),
                            options: [],
                            correctAnswer: null
                        };
                    } else if (trimmedLine.startsWith('+') && currentQuestion) {
                        const answerText = trimmedLine.substring(1).trim();
                        currentQuestion.correctAnswer = answerText;
                        currentQuestion.options.push(answerText);
                    } else if (currentQuestion && !currentQuestion.correctAnswer) {
                        currentQuestion.options.push(trimmedLine);
                    } else if (currentQuestion && currentQuestion.correctAnswer) {
                        currentQuestion.options.push(trimmedLine);
                    }
                }

                if (currentQuestion && currentQuestion.correctAnswer) {
                    questions.push(currentQuestion);
                }

                return questions;
            }
        },
        {
            id: 'plus_at_start',
            langKey: "parser_pattern_plus_at_start",
            detector: (text) => text.split('\n').some(line => line.trim().startsWith('+')),
            processor: (text) => {
                const questions = [];
                const blocks = text.split(/\n\s*\n/);
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
            langKey: "parser_pattern_tags_cyrillic",
            detector: (text) => /<Вопрос>|<вариант>/i.test(text),
            processor: (text) => {
                const questions = [];
                const cleanedText = text.replace(/^\s*\d+\s*\.?\s*</gm, '<');
                const blocks = cleanedText.split(/<Вопрос>/i).filter(b => b.trim() !== '');

                for (const block of blocks) {
                    const parts = block.split(/<вариант>/i).map(p => p.trim());
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
        },
        {
            id: 'tags_question_variant',
            langKey: "parser_pattern_tags_latin",
            detector: (text) => /<question|<variant>/i.test(text),
            processor: (text) => {
                const questions = [];
                const cleanedText = text.replace(/^\s*\d+\s*\.?\s*</gm, '<');
                const blocks = cleanedText.split(/<question.*?>/i).filter(b => b.trim() !== '');

                for (const block of blocks) {
                    const parts = block.split(/<variant>/i).map(p => p.trim().replace(/<\/?[^>]+(>|$)/g, ""));
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
        // ШАГ 1: Полностью очищаем старые опции
        parserPatternSelect.innerHTML = '';

        // ШАГ 2: Создаем и добавляем опцию "Автоопределение" заново, используя систему переводов
        const autoOption = document.createElement('option');
        autoOption.value = 'auto';
        autoOption.textContent = _('parser_auto_detect'); // Используем ключ из LANG_PACK
        autoOption.selected = true;
        parserPatternSelect.appendChild(autoOption);

        // ШАГ 3: Добавляем все остальные опции из нашего массива (этот код не меняется)
        PARSER_PATTERNS.forEach(pattern => {
            const option = document.createElement('option');
            option.value = pattern.id;
            option.textContent = _(pattern.langKey);
            parserPatternSelect.appendChild(option);
        });
    }



    function handleParserFileInput(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            parserInput.value = e.target.result;
            checkAICharacterLimit();
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
            alert(_('error_filter_no_variant_selected'));
            return;
        }

        const qstText = parserOutput.value;
        const allQuestions = parseQstResultForFiltering(qstText);
        
        const defectiveQuestions = allQuestions.filter(q => !selectedCounts.includes(q.variantCount));

        if (defectiveQuestions.length > 0) {
            // Адаптируем заголовок блока ошибок
            getEl('showErrorsBtn').innerHTML = `⚠️ Ошибки количества вариантов (<span id="errorCount">${defectiveQuestions.length}</span>)`;
            renderErrors(parserOutput, defectiveQuestions);
            alert(_('error_filter_found_mismatch').replace('{count}', defectiveQuestions.length));
        } else {
            alert(_('error_filter_all_match'));
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
            alert(_('parser_input_empty_alert'));
            return;
        }

        if (!checkAndConfirmOverwrite(parserOutput)) {
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
                alert(_('parser_pattern_not_found_alert'));
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
                alert(_('parser_no_questions_with_errors_alert').replace('{count}', errors.length));
            } else {
                alert(_('parser_no_questions_recognized_alert'));
            }
            return;
        }

        let qstResult = '';
        parsedQuestions.forEach(q => {
            if (q.type === 'category') {
                qstResult += `#_#${q.text}#_#\n\n`;
            } else {
                if (q.text && q.options && q.options.length > 0) {
                    qstResult += `? ${q.text.replace(/\n/g, ' ')}\n`;
                    q.options.forEach(opt => {
                        const prefix = (opt === q.correctAnswer) ? '+' : '-';
                        qstResult += `${prefix} ${opt.replace(/\n/g, ' ')}\n`;
                    });
                    qstResult += '\n';
                }
            }
        });

        parserOutput.value = qstResult.trim();
        parserOutputArea.classList.remove('hidden');

        if (errors.length > 0) {
            alert(_('parser_conversion_summary_alert').replace('{parsed}', parsedQuestions.length).replace('{errors}', errors.length));
        } else {
            alert(_('parser_conversion_success_alert').replace('{count}', parsedQuestions.length));
        }
    }



    async function downloadParsedQst() {
        const content = parserOutput.value;
        if (!content) return;
        await downloadOrShareFile('parsed_test.qst', content, 'text/plain;charset=utf-8', _('share_title_converted_test'));
    }


    function clearParserInput() {
        parserInput.value = '';
        parserFileInput.value = ''; // Важно также сбросить выбранный файл!
        parserInput.focus(); // Возвращаем курсор в поле для удобства
        hideAndResetErrorArea();
        checkAICharacterLimit();
    }




    async function handleAIGenerationRequest() {
        const text = parserInput.value.trim();
        if (!text) {
            alert(_('ai_error_text_empty'));
            return;
        }
        
        // --- НАЧАЛО ИЗМЕНЕНИЙ: Добавляем проверку на перезапись ---
        if (!checkAndConfirmOverwrite(parserOutput)) {
            return; // Если пользователь нажал "Отмена", прерываем выполнение
        }
        // --- КОНЕЦ ИЗМЕНЕНИЙ ---

        // Временно изменяем вид кнопки на время загрузки
        const originalButtonHTML = generateTestFromTextBtn.innerHTML;
        generateTestFromTextBtn.disabled = true;
        generateTestFromTextBtn.innerHTML = `<span>${_('ai_generating_button')}</span>`;
        showGlobalLoader(_('ai_analyzing_text'));

        const questionCount = aiAutoCount.checked ? 'auto' : aiQuestionCount.value;
        const answerCount = getEl('aiAnswerCount').value;
        const autoCategorize = getEl('aiAutoCategory').checked; // Считываем состояние нового чекбокса

        try {
            const response = await fetch(googleAppScriptUrl, {
                method: 'POST',
                headers: {
                  'Content-Type': 'text/plain',
                },
                body: JSON.stringify({
                    action: 'generateTest',
                    text: text,
                    count: questionCount,
                    answerCount: answerCount,
                    autoCategorize: autoCategorize // Добавляем новое поле в запрос
                })
            });

            const result = await response.json();

            if (result.success && result.qst) {
                parserOutput.value = result.qst;
                parserOutputArea.classList.remove('hidden');
                parserOutputArea.scrollIntoView({ behavior: 'smooth' });
            } else {
                throw new Error(result.error || _('ai_error_generation'));
            }



        } catch (error) {
            console.error("Ошибка генерации теста:", error);
            // --- НАЧАЛО ИЗМЕНЕНИЙ: Улучшенная обработка ошибок ---
            let userFriendlyError;

            if (error.message.includes("INTERNAL") || error.message.includes("HTTP 500")) {
                // Если это ошибка сервера, используем специальный текст
                userFriendlyError = _('ai_error_server_generation');
            } else {
                // Иначе используем общий текст ошибки
                userFriendlyError = _('ai_error_generation');
            }

            // Показываем пользователю понятное сообщение
            alert(userFriendlyError);
            // --- КОНЕЦ ИЗМЕНЕНИЙ ---
        } finally {
            // Возвращаем кнопку в исходное состояние
            generateTestFromTextBtn.disabled = false;
            generateTestFromTextBtn.innerHTML = originalButtonHTML;
            hideGlobalLoader();
        }
    }



    /**
     * НОВАЯ ФУНКЦИЯ: Переключает активную вкладку в разделе парсера.
     * @param {string} tabId - ID вкладки ('converter' или 'aiGenerator').
     */
    function switchParserTab(tabId) {
        // Скрываем все вкладки
        converterContent.classList.remove('active');
        aiGeneratorContent.classList.remove('active');

        // Убираем активное состояние у всех кнопок
        converterTabBtn.classList.remove('active');
        aiGeneratorTabBtn.classList.remove('active');

        // Показываем нужную вкладку и делаем активной ее кнопку
        if (tabId === 'converter') {
            converterContent.classList.add('active');
            converterTabBtn.classList.add('active');
        } else if (tabId === 'aiGenerator') {
            aiGeneratorContent.classList.add('active');
            aiGeneratorTabBtn.classList.add('active');
        }
    }



    async function handleAIGenerationFromTopicRequest() {
        const topic = aiTopicInput.value.trim();
        if (!topic) {
            alert(_('ai_topic_empty_alert'));
            return;
        }

        if (!checkAndConfirmOverwrite(parserOutput)) {
            return;
        }

        const originalButtonHTML = generateTestFromTopicBtn.innerHTML;
        generateTestFromTopicBtn.disabled = true;
        generateTestFromTopicBtn.innerHTML = `<span>${_('ai_generating_button')}</span>`;
        showGlobalLoader(_('ai_thinking_topic'));

        const questionCount = aiTopicQuestionCount.value;
        const answerCount = aiTopicAnswerCount.value;
        const autoCategorize = aiTopicAutoCategory.checked;

        try {
            const response = await fetch(googleAppScriptUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'text/plain' },
                body: JSON.stringify({
                    action: 'generateTestFromTopic',
                    topic: topic,
                    count: questionCount,
                    answerCount: answerCount,
                    autoCategorize: autoCategorize,
                    targetLanguage: localStorage.getItem('appLanguage') || 'ru'
                })
            });

            const result = await response.json();

            if (result.success && result.qst) {
                parserOutput.value = result.qst;
                parserOutputArea.classList.remove('hidden');
                parserOutputArea.scrollIntoView({ behavior: 'smooth' });
            } else {
                throw new Error(result.error || _('ai_error_generation'));
            }
        } catch (error) {
            console.error("Ошибка генерации теста по теме:", error);
            
            let userFriendlyError;
            if (error.message.includes("INTERNAL") || error.message.includes("HTTP 500")) {
                userFriendlyError = _('ai_error_server_generation');
            } else {
                userFriendlyError = _('ai_error_generation');
            }
            alert(userFriendlyError);
        } finally {
            generateTestFromTopicBtn.disabled = false;
            generateTestFromTopicBtn.innerHTML = originalButtonHTML;
            hideGlobalLoader();
        }
    }





    /**
     * НОВАЯ ФУНКЦИЯ-ПОМОЩНИК
     * Проверяет высоту блока с вопросом в модальном окне ИИ и добавляет/убирает
     * кнопку "свернуть/развернуть", если это необходимо.
     * @param {HTMLElement} questionElement - DOM-элемент блока с вопросом (#aiExplanationQuestion).
     */
    function setupAIQuestionCollapser(questionElement) {
        if (!questionElement) return;

        // Сначала всегда убираем старую кнопку и классы, чтобы начать с чистого листа
        const oldBtn = questionElement.querySelector('.expand-question-btn');
        if (oldBtn) oldBtn.remove();
        questionElement.classList.remove('collapsible', 'expanded');
        
        // Даем браузеру мгновение на перерисовку после изменения innerHTML
        setTimeout(() => {
            const MAX_HEIGHT = 120; // Максимальная высота
            // Проверяем, превышает ли реальная высота текста максимальную
            if (questionElement.scrollHeight > MAX_HEIGHT) {
                questionElement.classList.add('collapsible');
                const expandBtn = document.createElement('button');
                expandBtn.className = 'expand-question-btn';
                
                // Обработчик клика
                expandBtn.onclick = (e) => {
                    e.stopPropagation();
                    questionElement.classList.toggle('expanded');
                    const outputEl = getEl('aiExplanationOutput');
                    if (outputEl) {
                        outputEl.classList.toggle('collapsed', questionElement.classList.contains('expanded'));
                    }
                };
                questionElement.appendChild(expandBtn);
            }
        }, 0); // setTimeout с 0 задержкой - это стандартный трюк для ожидания рендеринга
    }


 
    async function showAIExplanation(question, userIncorrectAnswerText = null) {
        currentAIQuestion = question;
        currentAIUserIncorrectAnswer = userIncorrectAnswerText;
        currentAITranslation = null;
        isAIModalShowingTranslation = false;
        
        const outputEl = getEl('aiExplanationOutput');
        const toggleBtn = getEl('aiExplanationTranslateBtn');
        const questionEl = getEl('aiExplanationQuestion');
        
        toggleBtn.classList.add('hidden');
        outputEl.innerHTML = '';

        const styleContentEl = getEl('aiExplanationStyleContent');
        const styleTextEl = getEl('aiExplanationStyleText');
        styleContentEl.innerHTML = ''; 
        
        const styles = ['simple', 'scientific', 'associative', 'stepbystep', 'practical', 'visual'];
        
        styles.forEach(styleKey => {
            const link = document.createElement('a');
            link.href = '#';
            link.dataset.style = styleKey;
            link.textContent = _('ai_style_' + styleKey.toLowerCase());
            
            if (styleKey === 'simple') {
                link.classList.add('active');
            }
            styleContentEl.appendChild(link);
        });
        styleTextEl.textContent = _('ai_style_simple');

        showGlobalLoader(_('ai_explanation_title')); // Используем ключ

        try {
            if (isTranslateModeEnabled) {
                const lang = localStorage.getItem('appLanguage') || 'ru';
                const translationResult = await getCachedOrFetchTranslation(question, question.originalIndex, lang);
                
                if (translationResult) {
                    currentAITranslation = translationResult.question;
                    isAIModalShowingTranslation = true;
                    toggleBtn.classList.remove('hidden');
                }
            } else {
                const appLang = localStorage.getItem('appLanguage') || 'ru';
                const questionLang = detectLanguage(question.text);

                if (appLang !== questionLang) {
                    toggleBtn.classList.remove('hidden');
                }
            }
            
            updateAIModalQuestionText();
            document.body.classList.add('chat-open');
            ChatModule.showModal('aiExplanationModal');
            
            fetchAndDisplayExplanation('simple', userIncorrectAnswerText);

        } catch (error) {
            console.error("Ошибка при подготовке окна объяснения:", error);
            alert(_('ai_explanation_prepare_error'));
        } finally {
            hideGlobalLoader();
        }
    }




    function updateAIModalQuestionText() {
        const questionEl = getEl('aiExplanationQuestion');
        const toggleBtn = getEl('aiExplanationTranslateBtn');
        if (!questionEl || !toggleBtn) return;

        let questionToDisplay;

        // --- НАЧАЛО ИЗМЕНЕНИЙ: Новая, надежная логика ---
        if (isAIModalShowingTranslation && currentAITranslation) {
            // Если сейчас показан ПЕРЕВОД
            questionToDisplay = currentAITranslation;
            // то кнопка должна предлагать показать ОРИГИНАЛ
            toggleBtn.textContent = _('ai_show_original_button');
        } else {
            // Если сейчас показан ОРИГИНАЛ
            questionToDisplay = currentAIQuestion;
            // то кнопка должна предлагать показать ПЕРЕВОД
            toggleBtn.textContent = _('ai_show_translation_button');
        }
        // --- КОНЕЦ ИЗМЕНЕНИЙ ---

        if (!questionToDisplay) return;

        // Обновляем HTML-содержимое
        questionEl.innerHTML = `<strong>${_('ai_explanation_question')}:</strong> ${escapeHTML(questionToDisplay.text)}<br><strong>${_('ai_explanation_correct_answer')}:</strong> ${escapeHTML(questionToDisplay.options[questionToDisplay.correctAnswerIndex].text)}`;
        
        // СРАЗУ ЖЕ ПОСЛЕ ОБНОВЛЕНИЯ вызываем нашу новую функцию-помощник!
        setupAIQuestionCollapser(questionEl);
    }



    /**
     * НОВАЯ ФУНКЦИЯ
     * Обрабатывает клик по кнопке переключения языка в модальном окне ИИ.
     */
    async function handleAITranslateToggle() {
        const toggleBtn = getEl('aiExplanationTranslateBtn');
        if (!toggleBtn) return;

        // Если мы хотим показать перевод, но он еще не загружен
        if (!isAIModalShowingTranslation && !currentAITranslation) {
            const lang = localStorage.getItem('appLanguage') || 'ru';
            toggleBtn.disabled = true;
            toggleBtn.textContent = '...'; // Индикатор загрузки

            // Загружаем перевод
            const translationResult = await getCachedOrFetchTranslation(currentAIQuestion, currentAIQuestion.originalIndex, lang);
            
            toggleBtn.disabled = false;
            
            if (translationResult) {
                currentAITranslation = translationResult.question;
                isAIModalShowingTranslation = true;
            } else {
                alert(_('error_translation_failed'));
                // Если ошибка, остаемся на оригинале
                isAIModalShowingTranslation = false;
            }
        } else {
            // Если перевод уже загружен, просто переключаем флаг
            isAIModalShowingTranslation = !isAIModalShowingTranslation;
        }
        
        // Перерисовываем текст вопроса/ответа в модальном окне
        updateAIModalQuestionText();
    }



    async function fetchAndDisplayExplanation(style, userIncorrectAnswerText = null) { // <<<--- Добавлен второй параметр
        if (!currentAIQuestion) return;

        const styleContentEl = getEl('aiExplanationStyleContent');
        styleContentEl.querySelectorAll('a').forEach(a => a.classList.remove('active'));
        const activeLink = styleContentEl.querySelector(`a[data-style="${style}"]`);
        if (activeLink) activeLink.classList.add('active');
            
        const outputEl = getEl('aiExplanationOutput');
        outputEl.innerHTML = `<div class="typing-loader-container"><div class="typing-loader">${_('ai_explanation_loading')}</div></div>`;

        try {
            // --- НОВЫЙ ОБЪЕКТ ДЛЯ ОТПРАВКИ ---
            const payload = {
                action: 'getExplanation',
                question_text: currentAIQuestion.text,
                correct_answer_text: currentAIQuestion.options[currentAIQuestion.correctAnswerIndex].text,
                style: style,
                targetLanguage: localStorage.getItem('appLanguage') || 'ru'
            };

            // Если неверный ответ был передан, добавляем его в payload
            if (userIncorrectAnswerText) {
                payload.user_incorrect_answer_text = userIncorrectAnswerText;
            }
            // ---------------------------------

            const response = await fetch(googleAppScriptUrl, {
                method: 'POST',
                body: JSON.stringify(payload) // Отправляем новый объект
            });
            const result = await response.json();

            if (result.success) {
                if (window.marked) {
                    outputEl.innerHTML = marked.parse(result.explanation);
                } else {
                    console.warn('Библиотека marked.js не загружена. Отображение без форматирования.');
                    outputEl.innerHTML = result.explanation.replace(/\n/g, '<br>');
                }
            } else {
                throw new Error(result.error);
            }
        } catch (error) {
            let userFriendlyError;
            if (error.message.includes("INTERNAL") || error.message.includes("HTTP 500")) {
                userFriendlyError = _('ai_error_server');
            } else {
                userFriendlyError = _('ai_error_generic');
            }
            outputEl.innerHTML = `<p style="color: var(--feedback-incorrect-text);">${userFriendlyError}</p>`;
        }
    }


    function handleExplainClickInSearch(event, rawQuestionText) {
        event.stopPropagation(); // Предотвращаем срабатывание других кликов

        // Используем наш мощный парсер, чтобы превратить строку в объект
        // parseQstContent возвращает массив, поэтому берем первый элемент
        const parsedQuestions = parseQstContent(rawQuestionText);

        if (parsedQuestions && parsedQuestions.length > 0) {
            const questionObject = parsedQuestions[0];
            
            // Проверяем, что парсинг прошел успешно и у нас есть все данные
            if (questionObject && questionObject.text && questionObject.options) {
                // === ИЗМЕНЕНИЕ ЗДЕСЬ ===
                // 1. Находим текст правильного ответа
                const correctAnswerText = questionObject.options[questionObject.correctAnswerIndex].text;
                // 2. Передаем его вторым аргументом в функцию
                showAIExplanation(questionObject, correctAnswerText);
                // === КОНЕЦ ИЗМЕНЕНИЯ ===
            } else {
                alert(_('error_cannot_fully_process_question'));
            }
        } else {
            alert(_('error_no_question_for_explanation'));
        }
    }


    async function handleTranslateClickInSearch(event, buttonElement, rawQuestionText) {
        event.stopPropagation();

        const parsedQuestions = parseQstContent(rawQuestionText);
        if (!parsedQuestions || parsedQuestions.length === 0) {
            alert(_('error_cannot_process_question'));
            return;
        }
        const originalQuestionObject = parsedQuestions[0];

        buttonElement.classList.add('translating');
        buttonElement.disabled = true;

        try {
            const targetLang = localStorage.getItem('appLanguage') || 'ru';
            const translatedQuestionObject = await getTranslatedQuestion(originalQuestionObject, targetLang);

            if (translatedQuestionObject) {
                const card = buttonElement.closest('.result-card');
                if (!card) return;

                // 1. Находим элементы, которые нужно анимировать
                const questionElement = card.querySelector('.question-text-detail');
                const optionElements = card.querySelectorAll('.answer-option');

                if (!questionElement || optionElements.length === 0) {
                    // Если вдруг не нашли элементы, используем старый метод как запасной
                    const contentArea = card.querySelector('.result-card-content');
                    const translatedRawText = formatQuestionObjectToQstString(translatedQuestionObject);
                    contentArea.innerHTML = parseAndRenderQuestionBlock(translatedRawText);
                } else {
                    // 2. Создаем массив для всех анимаций
                    const allAnimations = [];

                    // Добавляем анимацию для текста вопроса
                    allAnimations.push(
                        animateTextTransformation(questionElement, originalQuestionObject.text, translatedQuestionObject.text)
                    );
                    
                    // Добавляем анимации для каждого варианта ответа
                    optionElements.forEach((optionEl, i) => {
                        const originalOption = originalQuestionObject.options[i];
                        const translatedOption = translatedQuestionObject.options[i];

                        if (originalOption && translatedOption) {
                            // Собираем полный текст (с иконкой) для анимации
                            const originalFullText = `${originalOption.isCorrect ? '✓' : '✗'} ${originalOption.text}`;
                            const translatedFullText = `${translatedOption.isCorrect ? '✓' : '✗'} ${translatedOption.text}`;
                            
                            // Используем более простую анимацию для однострочных элементов
                            allAnimations.push(animateSingleLine(optionEl, originalFullText, translatedFullText));
                        }
                    });

                    // 3. Ждем, пока ВСЕ анимации завершатся
                    await Promise.all(allAnimations);
                }

                // 4. Обновляем onclick-атрибуты кнопок новым (переведенным) текстом
                const translatedRawText = formatQuestionObjectToQstString(translatedQuestionObject);
                const escapedTranslatedText = escape(translatedRawText);

                const explainBtn = card.querySelector('.explain-search-result-btn');
                if (explainBtn) explainBtn.setAttribute('onclick', `window.mainApp.handleExplainClickInSearch(event, "${escapedTranslatedText}")`);
                
                const copyBtn = card.querySelector('.copy-search-result-btn');
                if (copyBtn) copyBtn.setAttribute('onclick', `window.mainApp.handleCopyClickInSearch(event, "${escapedTranslatedText}")`);
                
                const favBtn = card.querySelector('.favorite-search-result-btn');
                if (favBtn) favBtn.setAttribute('onclick', `window.mainApp.handleFavoriteClickInSearch(event, "${escapedTranslatedText}")`);
                
                buttonElement.setAttribute('onclick', `window.mainApp.handleTranslateClickInSearch(event, this, "${escapedTranslatedText}")`);
            } else {
                alert(_('error_translation_failed'));
            }
        } catch (error) {
            console.error("Ошибка перевода в поиске:", error);
            alert(_('error_translation_failed'));
        } finally {
            buttonElement.classList.remove('translating');
            buttonElement.disabled = false;
        }
    }


    
    function manageBackButtonInterceptor() {
        // Код остается тот же самый
        history.pushState(null, '', location.href);
        window.addEventListener('popstate', handleBackButton);
        console.log('Ловушка для кнопки "Назад" активирована.');
    }




    function setupExtensionListener() {
        // Проверяем, запущено ли приложение в контексте расширения Chrome
        // === НАЧАЛО НОВОГО КОДА ===
        window.addEventListener("message", (event) => {
            // Принимаем сообщения только от самого себя (от нашего content script)
            if (event.source !== window || !event.data) {
                return;
            }

            // Проверяем, что у сообщения наш уникальный тип
            if (event.data.type && (event.data.type === "FROM_QSTIUM_EXTENSION")) {
                 console.log('Сайт QSTiUM получил команду поиска от расширения:', event.data.text);
                 
                 const searchInput = getEl('searchQueryInput');
                 const searchButton = getEl('searchButton');
                 
                 if(searchInput && searchButton) {
                    // Вставляем текст в поле
                    searchInput.value = event.data.text;
                    
                    // Имитируем клик по кнопке поиска
                    searchButton.click();
                 }
            }
        }, false);
        // === КОНЕЦ НОВОГО КОДА ===
        console.log("Слушатель сообщений от расширения QSTiUM Helper активен.");
    }



    /**
     * Создает и настраивает Intersection Observer для управления CSS-анимациями.
     * Анимация будет активна только тогда, когда элемент виден на экране.
     */
    function setupAnimationObserver() {
        // Проверяем, поддерживает ли браузер эту технологию
        if (!('IntersectionObserver' in window)) {
            console.warn('IntersectionObserver не поддерживается. Анимации будут работать постоянно.');
            // В качестве запасного варианта, просто добавляем класс всем элементам
            document.querySelectorAll('.chat-badge, .unread-badge, .question-square.has-votes, .tab-counter').forEach(el => {
                el.classList.add('pulse-active');
            });
            return;
        }

        // Создаем сам "наблюдатель"
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                // isIntersecting - это свойство, которое говорит, виден ли элемент
                if (entry.isIntersecting) {
                    // Если виден - добавляем класс с анимацией
                    entry.target.classList.add('pulse-active');
                } else {
                    // Если не виден - убираем класс
                    entry.target.classList.remove('pulse-active');
                }
            });
        });

        // Находим все элементы, за которыми нужно следить
        const animatedElements = document.querySelectorAll('.chat-badge, .unread-badge, .question-square.has-votes, .tab-counter');
        
        // Говорим "наблюдателю" начать следить за каждым из них
        animatedElements.forEach(el => observer.observe(el));
    }


    // Expose mainApp to window for ChatModule access
    // =================================================================
    // ====      НОВЫЕ ФУНКЦИИ ДЛЯ ПЕРЕВОДА ВОПРОСА (v1.0)        ====
    // =================================================================

    /**
     * Переключает режим перевода, сохраняет состояние и обновляет интерфейс.
     */
    function toggleTranslateMode() {
        isTranslateModeEnabled = !isTranslateModeEnabled;
        localStorage.setItem('isTranslateModeEnabled', isTranslateModeEnabled);
        updateTranslateModeToggleVisual();
        // Немедленно перезагружаем текущий вопрос, чтобы применить/отменить перевод
        if (!quizArea.classList.contains('hidden') && questionsForCurrentQuiz.length > 0) {
            loadQuestion(currentQuestionIndex);
        }
    }

    /**
     * Обновляет внешний вид кнопки-переключателя перевода.
     */
    function updateTranslateModeToggleVisual() {
        if (translateQuestionBtn) {
            translateQuestionBtn.classList.toggle('active', isTranslateModeEnabled);
        }
    }

    /**
     * Отправляет запрос на сервер для перевода объекта вопроса.
     * @param {object} questionObject - Исходный объект вопроса.
     * @param {string} targetLang - Код целевого языка ('ru', 'en', 'kz').
     * @returns {Promise<object|null>} - Промис с переведенным объектом вопроса или null в случае ошибки.
     */
    async function getTranslatedQuestion(questionObject, targetLang) {
        try {
            const response = await fetch(googleAppScriptUrl, {
                method: 'POST',
                body: JSON.stringify({
                    action: 'translateQuestion',
                    questionObject: questionObject,
                    targetLang: targetLang
                })
            });
            const result = await response.json();
            if (result.success) {
                return result.translatedQuestion;
            } else {
                console.error('Ошибка перевода на сервере:', result.error);
                return null;
            }
        } catch (error) {
            console.error('Сетевая ошибка при переводе:', error);
            return null;
        }
    }





    /**
     * Получает перевод из кэша или запрашивает с сервера, если его там нет.
     * Теперь работает с ключами, зависящими от языка.
     * @param {object} questionObject - Исходный объект вопроса.
     * @param {number} originalIndex - Уникальный индекс вопроса в исходном файле.
     * @param {string} targetLang - Целевой язык перевода.
     * @returns {Promise<{question: object, fromCache: boolean}|null>} - Объект с результатом или null.
     */
    async function getCachedOrFetchTranslation(questionObject, originalIndex, targetLang) {
        // ИЗМЕНЕНИЕ: Используем новый, комбинированный ключ.
        const cacheKey = getCacheKey(originalIndex, targetLang);

        // 1. Проверяем кэш сессии по новому ключу.
        if (currentQuizTranslations.has(cacheKey)) {
            return { question: currentQuizTranslations.get(cacheKey), fromCache: true };
        }

        // 2. Если в кэше нет, запрашиваем перевод с сервера.
        const translatedQuestion = await getTranslatedQuestion(questionObject, targetLang);

        // 3. Если перевод успешен, сохраняем его ВЕЗДЕ.
        if (translatedQuestion) {
            // ИЗМЕНЕНИЕ: Сохраняем в кэш сессии с новым ключом.
            currentQuizTranslations.set(cacheKey, translatedQuestion);

            // Сохраняем в постоянный кэш localStorage
            if (currentFileCacheKey) {
                try {
                    const serializedCache = JSON.stringify(Array.from(currentQuizTranslations.entries()));
                    localStorage.setItem(currentFileCacheKey, serializedCache);
                } catch (e) {
                    console.error("Ошибка сохранения кэша в localStorage (возможно, нет места):", e);
                }
            }
            return { question: translatedQuestion, fromCache: false };
        }

        // 4. Если перевод не удался, возвращаем null.
        return null;
    }







    /**
     * Копирует критически важные CSS-стили из исходного элемента в зеркальный
     */
    function copyRelevantStyles(sourceElement, targetElement) {
        const computedStyle = window.getComputedStyle(sourceElement);
        const relevantStyles = [
            'width', 'font-family', 'font-size', 'font-weight', 'font-style',
            'line-height', 'letter-spacing', 'word-spacing', 'text-transform',
            'padding-left', 'padding-right', 'padding-top', 'padding-bottom',
            'border-left-width', 'border-right-width', 'box-sizing',
            'word-break', 'overflow-wrap', 'hyphens'
        ];
        
        relevantStyles.forEach(style => {
            targetElement.style[style] = computedStyle[style];
        });
    }

    /**
     * Определяет визуальные строки текста, анализируя изменения высоты элемента
     */
    function getVisualLines(text, referenceElement) {
        if (!text.trim()) return [''];
        
        // Создаем зеркальный невидимый элемент
        const mirror = document.createElement('div');
        mirror.style.position = 'absolute';
        mirror.style.visibility = 'hidden';
        mirror.style.top = '-9999px';
        mirror.style.left = '-9999px';
        mirror.style.whiteSpace = 'normal';
        mirror.style.wordWrap = 'break-word';
        
        // Копируем стили
        copyRelevantStyles(referenceElement, mirror);
        
        document.body.appendChild(mirror);
        
        const words = text.split(/(\s+)/); // Сохраняем пробелы
        const lines = [];
        let currentLine = '';
        let lastHeight = 0;
        
        try {
            for (let i = 0; i < words.length; i++) {
                const testText = currentLine + words[i];
                mirror.textContent = testText;
                const currentHeight = mirror.offsetHeight;
                
                // Если высота увеличилась, значит произошел перенос строки
                if (lastHeight > 0 && currentHeight > lastHeight) {
                    // Добавляем предыдущую строку в массив (без текущего слова)
                    lines.push(currentLine.trim());
                    currentLine = words[i];
                } else {
                    currentLine = testText;
                }
                
                lastHeight = currentHeight;
            }
            
            // Добавляем последнюю строку
            if (currentLine.trim()) {
                lines.push(currentLine.trim());
            }
            
            return lines.length > 0 ? lines : [''];
        } finally {
            document.body.removeChild(mirror);
        }
    }

    /**
     * Анимирует одну строку с эффектом курсора
     */
    async function animateSingleLine(element, startText, endText) {
        const cursor = '|';
        const charDelay = 7;
        const totalSteps = Math.max(startText.length, endText.length);

        for (let i = 0; i <= totalSteps; i++) {
            const newPart = endText.substring(0, i);
            const oldPart = startText.substring(i);
            element.textContent = newPart + cursor + oldPart;
            await new Promise(resolve => setTimeout(resolve, charDelay));
        }
        element.textContent = endText;
    }

    /**
     * Основная "умная" функция анимации трансформации многострочного текста
     */
    async function animateTextTransformation(element, startText, endText) {
        // Фаза измерения: определяем визуальные строки
        const startLines = getVisualLines(startText, element);
        const endLines = getVisualLines(endText, element);
        
        // Определяем максимальное количество строк для анимации
        const maxLines = Math.max(startLines.length, endLines.length);
        
        // Фаза подготовки: создаем div для каждой строки
        const originalContent = element.innerHTML;
        element.innerHTML = '';
        
        const lineDivs = [];
        for (let i = 0; i < maxLines; i++) {
            const lineDiv = document.createElement('div');
            lineDiv.style.minHeight = '1em'; // Предотвращаем схлопывание пустых строк
            element.appendChild(lineDiv);
            lineDivs.push(lineDiv);
        }
        
        try {
            // Фаза параллельной анимации: запускаем анимацию всех строк одновременно
            const animations = [];
            
            for (let i = 0; i < maxLines; i++) {
                const startLine = startLines[i] || '';
                const endLine = endLines[i] || '';
                
                animations.push(
                    animateSingleLine(lineDivs[i], startLine, endLine)
                );
            }
            
            // Ждем завершения всех анимаций
            await Promise.all(animations);
            
        } finally {
            // Фаза очистки: восстанавливаем оригинальную структуру
            element.innerHTML = '';
            element.textContent = endText;
        }
    }





    /**
     * Определяет язык текста по наличию специфичных символов.
     * @param {string} text - Текст для анализа.
     * @returns {string} - Код языка ('kk', 'en', 'ru').
     */
    function detectLanguage(text) {
        if (/[әіңғүұқөһ]/i.test(text)) return 'kk';
        // Проверяем на латиницу, но исключаем одиночные символы или технические слова
        if (/[a-z]/i.test(text) && !/[а-я]/i.test(text)) return 'en';
        return 'ru';
    }





    /**
     * Главная функция, которая управляет отображением переведенного вопроса.
     * @param {object} originalQuestion - Исходный (непереведенный) объект вопроса.
     */
    async function displayTranslatedQuestion(originalQuestion) {
        const indexAtRequestTime = currentQuestionIndex;
        
        // ИЗМЕНЕНИЕ: Определяем целевой язык в самом начале.
        const targetLang = localStorage.getItem('appLanguage') || 'ru';
        const cacheKey = getCacheKey(originalQuestion.originalIndex, targetLang);

        // ИЗМЕНЕНИЕ: Проверяем наличие кэша для КОНКРЕТНОГО ЯЗЫКА.
        const isCachedForThisLang = currentQuizTranslations.has(cacheKey);

        if (isCachedForThisLang) {
            // Если перевод для нужного языка уже есть, просто отображаем его.
            const translatedQuestion = currentQuizTranslations.get(cacheKey);
            displayQuestionContent(translatedQuestion, false);
        } else {
            // Если перевода для этого языка нет, начинаем процесс с анимацией.
            displayQuestionContent(originalQuestion, false);
            translateQuestionBtn?.classList.add('translating');
            
            try {
                // ИЗМЕНЕНИЕ: Передаем целевой язык в функцию.
                const result = await getCachedOrFetchTranslation(originalQuestion, originalQuestion.originalIndex, targetLang);

                if (indexAtRequestTime !== currentQuestionIndex) {
                    console.log('Перевод для предыдущего вопроса отменен.');
                    return;
                }
                
                if (result && !result.fromCache) {
                    const translatedQuestion = result.question;
                    const allAnimations = [];
                    
                    allAnimations.push(animateTextTransformation(questionTextEl, originalQuestion.text, translatedQuestion.text));

                    const optionElements = answerOptionsEl.querySelectorAll('li');
                    for (let i = 0; i < optionElements.length; i++) {
                        const li = optionElements[i];
                        const originalOptionText = originalQuestion.options[i]?.text || '';
                        const translatedOptionText = translatedQuestion.options[i]?.text || '';
                        
                        if (originalOptionText || translatedOptionText) {
                            allAnimations.push(
                                new Promise(resolve => {
                                    setTimeout(async () => {
                                        await animateSingleLine(li, originalOptionText, translatedOptionText);
                                        resolve();
                                    }, i * 100); 
                                })
                            );
                        }
                    }
                    
                    await Promise.all(allAnimations);
                    
                } else if (!result) {
                    alert("Не удалось перевести вопрос. Будет показан оригинал.");
                }
            } finally {
                translateQuestionBtn?.classList.remove('translating');
            }
        }
    }





    /**
     * МГНОВЕННО отображает текст вопроса и вариантов без анимации.
     * ВЕРСИЯ 2.0: Всегда отображает подсветку триггеров,
     * но делает слова кликабельными только при активном режиме.
     * @param {object} question - Объект вопроса для отображения.
     */
    function displayQuestionContent(question) {
        // 1. Очищаем старое содержимое, как и раньше.
        questionTextEl.innerHTML = '';
        answerOptionsEl.innerHTML = '';

        // 2. ВСЕГДА используем функцию, которая создает HTML с подсветкой.
        // Это гарантирует, что если у вопроса есть отмеченные слова, они будут красными.
        questionTextEl.innerHTML = renderQuestionTextWithTriggers(question);

        // 3. А вот КЛИКАБЕЛЬНОСТЬ добавляем, только если режим триггеров активен.
        // Это разделяет визуальное отображение и интерактивность.
        if (triggerWordModeEnabled) {
            addTriggerClickListeners();
        }

        // 4. Код для отображения вариантов ответов остаётся без изменений.
        if (question.options) {
            question.options.forEach((option, i) => {
                const li = document.createElement('li');
                li.dataset.index = i;
                li.textContent = option.text;
                answerOptionsEl.appendChild(li);
                
                const answerState = userAnswers[currentQuestionIndex];
                if (answerState && answerState.answered) {
                    li.classList.add('answered');
                    if (i === answerState.selectedOptionIndex) {
                        li.classList.add(answerState.correct ? 'correct' : 'incorrect');
                    }
                    if (!answerState.correct && i === question.correctAnswerIndex) {
                        li.classList.add('actual-correct');
                    }
                } else {
                    li.addEventListener('click', handleAnswerSelect);
                }
            });
        }
    }






    // === НАЧАЛО НОВОГО КОДА ===
    function updateDownloadButtonsText() {
        if (!downloadTranslatedTxtButton || !downloadTranslatedQstButton) return;
        const lang = localStorage.getItem('appLanguage') || 'ru';
        
        let textTxt = _('download_translated_txt_button').replace('{lang}', lang);
        downloadTranslatedTxtButton.textContent = textTxt;

        let textQst = _('download_translated_qst_button').replace('{lang}', lang);
        downloadTranslatedQstButton.textContent = textQst;
    }



    /**
     * НОВАЯ ФУНКЦИЯ-ПОМОЩНИК
     * Восстанавливает текстовую строку вопроса, вставляя маркеры (~) для триггер-слов.
     * @param {object} questionObject - Объект вопроса, который может содержать triggeredWordIndices.
     * @returns {string} - Текст вопроса, готовый для записи в .qst файл.
     */
    function reconstructTextWithTriggers(questionObject) {
        // Если у вопроса нет текста или нет отмеченных слов, просто возвращаем исходный текст.
        if (!questionObject.text || !questionObject.triggeredWordIndices || questionObject.triggeredWordIndices.length === 0) {
            return questionObject.text;
        }

        const tokens = tokenizeText(questionObject.text);
        let reconstructedText = '';
        let wordIdx = 0;

        tokens.forEach(token => {
            const isWord = /\S/.test(token) && !/^[.,;:!?()"“”«»-]+$/.test(token);
            if (isWord) {
                // Проверяем, является ли текущее слово триггером
                if (questionObject.triggeredWordIndices.includes(wordIdx)) {
                    reconstructedText += `~${token}~`; // Оборачиваем в маркеры
                } else {
                    reconstructedText += token;
                }
                wordIdx++;
            } else {
                // Это пунктуация или пробел, просто добавляем
                reconstructedText += token;
            }
        });

        return reconstructedText.trim();
    }


 

    async function handleDownloadTranslatedTxt() {
        if (!isTranslateModeEnabled || currentQuizTranslations.size === 0) {
            alert(_('no_translations_to_download'));
            return;
        }

        const lang = localStorage.getItem('appLanguage') || 'ru';
        let fileContent = '';

        questionsForCurrentQuiz.forEach(q => {
            if (q.type === 'category') {
                fileContent += `--- ${q.text} ---\n\n`;
                return;
            }
            
            const cacheKey = getCacheKey(q.originalIndex, lang);
            const translatedQuestion = currentQuizTranslations.get(cacheKey);
            const questionToUse = translatedQuestion || q;
            
            const correctAnswer = questionToUse.options.find(opt => opt.isCorrect);

            // --- ИЗМЕНЕНИЕ: Используем новую функцию для текста вопроса ---
            const questionTextForFile = reconstructTextWithTriggers(questionToUse);

            fileContent += `${_('download_txt_question_label')}: ${questionTextForFile}\n`;
            fileContent += `${_('download_txt_answer_label')}: ${correctAnswer ? correctAnswer.text : 'N/A'}\n\n`;
        });

        if (!fileContent.trim()) {
            alert(_('error_creating_translation_file'));
            return;
        }

        const baseFileName = originalFileNameForReview ? originalFileNameForReview.replace(/\.(qst|txt)$/i, '') : 'quiz';
        const fileName = `${lang}_${baseFileName}.txt`;

        await downloadOrShareFile(fileName, fileContent, 'text/plain;charset=utf-8', _('share_title_translated_test_txt'));
    }



    async function handleDownloadTranslatedQst() {
        if (!isTranslateModeEnabled || currentQuizTranslations.size === 0) {
            alert(_('no_translations_to_download'));
            return;
        }
        
        const lang = localStorage.getItem('appLanguage') || 'ru';
        let fileContent = '';

        questionsForCurrentQuiz.forEach(q => {
            if (q.type === 'category') {
                fileContent += `#_#${q.text}#_#\n\n`;
                return;
            }
            
            const cacheKey = getCacheKey(q.originalIndex, lang);
            const translatedQuestion = currentQuizTranslations.get(cacheKey);
            const questionToUse = translatedQuestion || q;

            // --- ИЗМЕНЕНИЕ: Используем новую функцию для текста вопроса ---
            const questionTextForFile = reconstructTextWithTriggers(questionToUse);

            fileContent += `? ${questionTextForFile}\n`;
            questionToUse.options.forEach(opt => {
                const prefix = opt.isCorrect ? '+' : '-';
                fileContent += `${prefix} ${opt.text}\n`;
            });
            fileContent += '\n';
        });
        
        if (!fileContent.trim()) {
            alert(_('error_creating_translation_file'));
            return;
        }

        const baseFileName = originalFileNameForReview ? originalFileNameForReview.replace(/\.(qst|txt)$/i, '') : 'quiz';
        const fileName = `${lang}_${baseFileName}.qst`;

        await downloadOrShareFile(fileName, fileContent, 'text/plain;charset=utf-8', _('share_title_translated_test_qst'));
    }


     function handleFlashcardsModeChange() {
            const isChecked = flashcardsModeCheckbox.checked;

            // Блокируем/разблокируем связанные опции
            shuffleAnswersCheckbox.disabled = isChecked;
            readingModeCheckbox.disabled = isChecked;
            feedbackModeCheckbox.disabled = isChecked;

            if (isChecked) {
                // Сбрасываем несовместимые опции
                shuffleAnswersCheckbox.checked = false;
                readingModeCheckbox.checked = false;
                feedbackModeCheckbox.checked = false;
                // Меняем текст кнопки
                startQuizButton.textContent = _('start_flashcards_button');
            } else {
                // Возвращаем текст кнопки по умолчанию
                startQuizButton.textContent = _('start_quiz_button');
            }
        }



    async function requestErrorAnalysis() {
        if (currentQuizErrorData.length === 0) {
            alert(_('error_analysis_no_data'));
            return;
        }

        const analysisBtn = getEl('aiAnalysisBtn');
        const resultContainer = getEl('aiAnalysisResult');
        const originalBtnText = analysisBtn.textContent;

        analysisBtn.disabled = true;
        // === ИЗМЕНЕНИЕ: Используем систему переводов ===
        analysisBtn.textContent = _('ai_analyzing_errors_button');
        resultContainer.classList.add('hidden');
        resultContainer.innerHTML = '';

        try {
            const currentUser = ChatModule.getCurrentUser();
            const userNameForAnalysis = currentUser ? currentUser.displayName : 'guest';

            const response = await fetch(googleAppScriptUrl, {
                method: 'POST',
                body: JSON.stringify({
                    action: 'getErrorAnalysis',
                    errors: currentQuizErrorData,
                    userName: userNameForAnalysis,
                    targetLanguage: localStorage.getItem('appLanguage') || 'ru'
                })
            });

            const result = await response.json();

            if (result.success && result.analysis) {
                resultContainer.innerHTML = marked.parse(result.analysis);
                resultContainer.classList.remove('hidden');
            } else {
                throw new Error(result.error || 'Не удалось получить анализ от ИИ.');
            }

        } catch (error) {
            console.error("Ошибка при запросе анализа ошибок:", error);
            resultContainer.innerHTML = `<p style="color: var(--feedback-incorrect-text);">Произошла ошибка: ${error.message}</p>`;
            resultContainer.classList.remove('hidden');
        } finally {
            analysisBtn.disabled = false;
            analysisBtn.textContent = _('ai_error_analysis_button');
        }
    }


    /**
     * Инициализирует и настраивает двойной ползунок выбора диапазона.
     * @param {number} totalQuestions - Общее количество вопросов в тесте.
     */
    function initDualSlider(totalQuestions) {
        if (!rangeSliderStart || !rangeSliderEnd) return;

        // Устанавливаем максимальные значения для всех связанных элементов
        rangeSliderStart.max = totalQuestions;
        rangeSliderEnd.max = totalQuestions;
        questionRangeStartInput.max = totalQuestions;
        questionRangeEndInput.max = totalQuestions;

        // Сбрасываем значения по умолчанию (весь диапазон)
        rangeSliderStart.value = 1;
        questionRangeStartInput.value = 1;
        rangeSliderEnd.value = totalQuestions;
        questionRangeEndInput.value = totalQuestions;
        
        // Удаляем старые обработчики, чтобы избежать дублирования
        rangeSliderStart.removeEventListener('input', handleSliderInput);
        rangeSliderEnd.removeEventListener('input', handleSliderInput);
        questionRangeStartInput.removeEventListener('input', handleNumberInput);
        questionRangeEndInput.removeEventListener('input', handleNumberInput);

        rangeSliderStart.addEventListener('input', handleSliderInput);
        rangeSliderEnd.addEventListener('input', handleSliderInput);
        questionRangeStartInput.addEventListener('input', handleNumberInput);
        questionRangeEndInput.addEventListener('input', handleNumberInput);

        updateSliderVisuals();
        generateSliderTicks(totalQuestions); // <-- ДОБАВЛЕНО
    }
    
    /**
     * Обновляет визуальное состояние ползунка (закрашенную область).
     */
    function updateSliderVisuals() {
        if (!sliderProgress || !rangeSliderStart || !rangeSliderEnd) return;
        
        const startValue = parseInt(rangeSliderStart.value);
        const endValue = parseInt(rangeSliderEnd.value);
        const max = parseInt(rangeSliderStart.max);

        const startPercent = ((startValue - 1) / (max - 1)) * 100;
        const endPercent = ((endValue - 1) / (max - 1)) * 100;

        sliderProgress.style.left = `${startPercent}%`;
        sliderProgress.style.width = `${endPercent - startPercent}%`;
    }


    function handleSliderInput(event) {
        const startSlider = rangeSliderStart;
        const endSlider = rangeSliderEnd;
        const step = 5; // Наш новый шаг
        const max = parseInt(startSlider.max);

        // Получаем "примагниченные" значения
        let startValue = snapToStep(parseInt(startSlider.value), step, max);
        let endValue = snapToStep(parseInt(endSlider.value), step, max);
        
        // Предотвращаем пересечение бегунков
        if (endValue < startValue) {
            // Если двигали левый бегунок и он "заехал" за правый, выравниваем их
            if (event.target.id === 'rangeSliderStart') {
                 startValue = endValue;
            } else { // И наоборот
                 endValue = startValue;
            }
        }

        // Обновляем положение самих ползунков, чтобы они "прыгнули" на нужную позицию
        startSlider.value = startValue;
        endSlider.value = endValue;

        // Синхронизируем числовые поля
        questionRangeStartInput.value = startValue;
        questionRangeEndInput.value = endValue;
        
        updateSliderVisuals();
    }

    /**
     * Обрабатывает изменение значений в числовых полях.
     */
    function handleNumberInput(event) {
        let startValue = parseInt(questionRangeStartInput.value);
        let endValue = parseInt(questionRangeEndInput.value);
        const max = parseInt(rangeSliderStart.max);

        // Валидация
        if (startValue < 1) startValue = 1;
        if (endValue > max) endValue = max;
        if (startValue > endValue) {
             if (event.target.id === 'questionRangeStart') {
                startValue = endValue;
             } else {
                endValue = startValue;
             }
        }
        
        questionRangeStartInput.value = startValue;
        questionRangeEndInput.value = endValue;

        // Синхронизируем ползунки
        rangeSliderStart.value = startValue;
        rangeSliderEnd.value = endValue;
        
        updateSliderVisuals();
    }
    
    /**
     * Включает/отключает блок выбора диапазона в зависимости от чекбокса "Случайный набор".
     */
    function handleShuffleNToggle() {
        const isDisabled = shuffleNCheckbox.checked;
        questionRangeGroup.classList.toggle('disabled', isDisabled);
        shuffleNCountInput.disabled = !isDisabled;
    }

    /**
     * Генерирует и отображает насечки (ticks) под двойным ползунком.
     * @param {number} totalQuestions - Общее количество вопросов.
     */
    function generateSliderTicks(totalQuestions) {
        if (!sliderTicks || totalQuestions < 10) {
            sliderTicks.innerHTML = '';
            return;
        }

        sliderTicks.innerHTML = ''; // Очищаем старые насечки

        // Динамически рассчитываем интервал для насечек, чтобы их не было слишком много
        const interval = 5;

        // Определяем, как часто ставить числовые метки
        const labelIntervalMultiplier = totalQuestions > 200 ? 5 : 4;
        const labelInterval = interval * labelIntervalMultiplier;

        for (let i = 1; i <= totalQuestions; i += interval) {
            const positionPercent = ((i - 1) / (totalQuestions - 1)) * 100;
            
            const tick = document.createElement('div');
            tick.className = 'tick';
            tick.style.left = `${positionPercent}%`;
            sliderTicks.appendChild(tick);

            // Добавляем метки для первого, последнего и "юбилейных" значений
            if (i === 1 || i % labelInterval === 0 || i + interval > totalQuestions) {
                const label = document.createElement('span');
                label.className = 'tick-label';
                label.textContent = (i + interval > totalQuestions && i !== totalQuestions) ? totalQuestions : i;
                label.style.left = `${positionPercent}%`;
                sliderTicks.appendChild(label);
            }
        }
    }


    /**
     * Инициализирует одиночный ползунок (например, для времени).
     */
    function initSingleSlider() {
        if (!timeLimitInput) return;
        generateTimeSliderTicks();
        updateSingleSliderVisuals(); // Устанавливаем начальное положение
    }

    /**
     * Обновляет визуальное состояние прогресс-бара одиночного ползунка.
     */
    function updateSingleSliderVisuals() {
        const progressEl = getEl('timeSliderProgress');
        if (!progressEl || !timeLimitInput) return;
        
        const value = parseInt(timeLimitInput.value);
        const max = parseInt(timeLimitInput.max);
        const percent = (max > 0) ? (value / max) * 100 : 0;
        
        progressEl.style.width = `${percent}%`;
    }

    /**
     * Генерирует насечки для ползунка выбора времени.
     */
    function generateTimeSliderTicks() {
        if (!timeSliderTicks) return;
        timeSliderTicks.innerHTML = '';
        const max = parseInt(timeLimitInput.max);
        const step = 30; // Насечки каждые 30 минут

        for (let i = 0; i <= max; i += step) {
             const positionPercent = (i / max) * 100;
             
             const tick = document.createElement('div');
             tick.className = 'tick';
             tick.style.left = `${positionPercent}%`;
             timeSliderTicks.appendChild(tick);

             if (i > 0 && i < max) {
                const label = document.createElement('span');
                label.className = 'tick-label';
                label.textContent = i;
                label.style.left = `${positionPercent}%`;
                timeSliderTicks.appendChild(label);
             }
        }
    }


    /**
     * "Примагничивает" значение к ближайшему шагу, с особым случаем для максимального значения.
     * @param {number} value - Текущее значение.
     * @param {number} step - Шаг, к которому нужно "примагнитить".
     * @param {number} max - Максимально возможное значение.
     * @returns {number} - "Примагниченное" значение.
     */
    function snapToStep(value, step, max) {
      // Если пользователь довел ползунок до самого конца, всегда возвращаем максимум.
      if (value === max) {
        return max;
      }
      // Округляем значение до ближайшего, кратного шагу.
      const snappedValue = Math.round(value / step) * step;
      // Гарантируем, что результат не будет меньше 1.
      return Math.max(1, snappedValue);
    }




    // --- Public methods exposed from mainApp ---
    return {
        init: initializeApp,
        copyToClipboardMain: copyToClipboardMain, 
        parseQstContent: parseQstContent, 
        processFile: processFile,         
        downloadFile: downloadFileBrowserFallback,
        downloadOrShareFile: downloadOrShareFile,
        handleFavoriteClickInSearch: handleFavoriteClickInSearch,
        handleCopyClickInSearch: handleCopyClickInSearch,
        handleExplainClickInSearch: handleExplainClickInSearch,
        handleTranslateClickInSearch: handleTranslateClickInSearch,
        showGlobalLoader: showGlobalLoader,
        hideGlobalLoader: hideGlobalLoader,
        manageBackButtonInterceptor: manageBackButtonInterceptor,
        setupExtensionListener: setupExtensionListener,
        animateTextTransformation: animateTextTransformation,
        testMobileDownload: () => {
            console.log('Тестирование мобильного скачивания...');
            console.log('detectMobileDevice():', detectMobileDevice());
            downloadOrShareFile('test.txt', 'Тестовое содержимое файла', 'text/plain', 'Тест');
        }        
    };
})();

document.addEventListener('DOMContentLoaded', mainApp.init);





window.mainApp = mainApp;

