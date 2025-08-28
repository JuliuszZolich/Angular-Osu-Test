import { Beatmap } from "./beatmap";

export type Score = {
    accuracy: number;
    beatmap_id: number;
    best_id?: number;
    build_id?: number;
    beatmap?: Beatmap;
    classic_total_score: number;
    ended_at: string;
    has_replay: boolean;
    id: number;
    is_perfect_combo: boolean;
    legacy_perfect: boolean;
    legacy_score_id?: number;
    legacy_total_score: number;
    max_combo: number;
    maximum_statistics: any;
    mods: any[];
    passed: boolean;
    playlist_item_id?: number;
    pp?: number;
    preserve: boolean;
    processed: boolean;
    rank: string;
    ranked: boolean;
    room_id?: number;
    ruleset_id: number;
    started_at?: string;
    statistics: any;
    total_score: number;
    type: string;
    user_id: number;
}