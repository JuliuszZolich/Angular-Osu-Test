//Wszystkie wartości są jako optional bo w dokumentacji nie było sprecyzowane więc wziąłem je z http requesta
export type Beatmap = {
    beatmapset_id?: number;
    difficulty_rating?: number;
    id?: number;
    mode?: string;
    status?: string;
    total_length?: number;
    user_id?: number;
    version?: string;
    accuracy?: number;
    ar?: number;
    bpm?: number;
    convert?: boolean;
    count_circles?: number;
    count_sliders?: number;
    count_spinners?: number;
    cs?: number;
    deleted_at?: string | null;
    drain?: number;
    hit_length?: number;
    is_scoreable?: boolean;
    last_updated?: string;
    mode_int?: number;
    passcount?: number;
    playcount?: number;
    ranked?: number;
    url?: string;
    checksum?: string;
    beatmapset?: {
        artist?: string;
        artist_unicode?: string;
        covers?: {
            cover?: string;
            "cover@2x"?: string;
            card?: string;
            "card@2x"?: string;
            list?: string;
            "list@2x"?: string;
            slimcover?: string;
            "slimcover@2x"?: string;
        };
        creator?: string;
        favourite_count?: number;
        genre_id?: number;
        hype?: any;
        id?: number;
        language_id?: number;
        nsfw?: boolean;
        offset?: number;
        play_count?: number;
        preview_url?: string;
        source?: string;
        spotlight?: boolean;
        status?: string;
        title?: string;
        title_unicode?: string;
        track_id?: any;
        user_id?: number;
        video?: boolean;
        bpm?: number;
        can_be_hyped?: boolean;
        deleted_at?: string | null;
        discussion_enabled?: boolean;
        discussion_locked?: boolean;
        is_scoreable?: boolean;
        last_updated?: string;
        legacy_thread_url?: string;
        nominations_summary?: {
            current?: number;
            eligible_main_rulesets?: string[];
            required_meta?: {
                main_ruleset?: number;
                non_main_ruleset?: number;
            };
        };
        ranked?: number;
        ranked_date?: string;
        rating?: number;
        storyboard?: boolean;
        submitted_date?: string;
        tags?: string;
        availability?: {
            download_disabled?: boolean;
            more_information?: any;
        };
        ratings?: number[];
    };
    current_user_playcount?: number;
    failtimes?: {
        fail?: number[];
        exit?: number[];
    };
    max_combo?: number;
    owners?: {
        id?: number;
        username?: string;
    }[];
};