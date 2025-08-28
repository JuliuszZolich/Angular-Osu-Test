import { EventEmitter, Injectable, Signal, signal, WritableSignal } from "@angular/core";
import { Beatmap } from "../../model/beatmap";

@Injectable({
    providedIn:'root'
})
export class OsuMapStateService {
    private beatmap?:Beatmap;
    private _beatmapChangeSignal: WritableSignal<Beatmap | undefined> = signal(undefined, {equal:()=>false});
    
    readonly currentBeatmap = this._beatmapChangeSignal.asReadonly();

    setBeatMap(beatmap: Beatmap){
        this.beatmap = beatmap;
        this._beatmapChangeSignal.set(beatmap);
    }
}