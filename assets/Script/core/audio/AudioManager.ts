

// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { BoundNameEnum } from "../../Defines";
import { resLoader } from "../resLoad/ResLoader";


export default class AudioManager {

    private m_effectIds:{[k:string]:number} = Object.create(null);  // 播放中的音效
    private m_soundMap:Map<string,cc.AudioClip> = new Map();
    private m_bgMusicName:string;
    private m_bgAudioID:number =-1;
    private m_bgValue:number =1.0;
    private m_effectValue:number = 1.0;

    pre_loaded:boolean = false;
    init(){
        let self =this;
        cc.game.on(cc.game.EVENT_HIDE, function () {
           // cc.audioEngine.pauseAll();
            self.pauseMusic();
            console.log('cocos---------game hide')
        });
        cc.game.on(cc.game.EVENT_SHOW, function () {
            //cc.audioEngine.resumeAll();
            self.resumeMusic();
            console.log('cocos---------game show')
        });

        this.setBgValue(this.m_bgValue);
        this.setEffectValue(this.m_effectValue);
    }
    preLoad(){
        if(this.pre_loaded)return;
        // this.pre_loaded = true;
        // for(let s in SOUND_NAME){
        //     if(s.includes('fpx_')){
        //         this.loadAudio(SOUND_NAME[s]);
        //         //console.log('load audio-------:',SOUND_NAME[s])
        //     }
        // }      
    }
    
    playMusic(soundName:string,finishCall?,loop = true){  
        if(this.m_bgAudioID >-1){
            this.stopMusic();
            cc.audioEngine.setFinishCallback(this.m_bgAudioID, null);
        }
        let audioClip = this.m_soundMap.get(soundName);
        if(audioClip){
            this.m_bgAudioID =  cc.audioEngine.playMusic(audioClip,loop);
            this.m_bgMusicName = soundName;
            cc.audioEngine.setFinishCallback(this.m_bgAudioID,finishCall);
        }else{
            this.loadAudio(soundName,(audio) =>{
                this.m_bgAudioID = cc.audioEngine.playMusic(audio,loop);
                this.m_bgMusicName = soundName;
                cc.audioEngine.setFinishCallback(this.m_bgAudioID,finishCall);
            })  
        }
    }
    private loadAudio(audioName:string,cb?:Function){
        let url:string = this.getUrl(audioName);

        resLoader.loadRes<cc.AudioClip>(BoundNameEnum.sound,url).then((audio) =>{
            this.m_soundMap.set(audioName,audio);
            if(cb)cb(audio);
        })
    }
    pauseMusic(){
        if(this.m_bgAudioID >-1 && this.isAudioPlaying(this.m_bgAudioID)){
             cc.audioEngine.pauseMusic();
        }else{
            this.stopMusic();
        }
    }

    resumeMusic(){
         if(this.m_bgAudioID >-1 && this.isAudioPause(this.m_bgAudioID)){
             cc.audioEngine.resumeMusic();
         }else{
            this.m_bgMusicName && this.playMusic(this.m_bgMusicName);
         }       
     }
    stopMusic(){
        cc.audioEngine.stopMusic();
        this.m_bgAudioID =-1;
    }
    playEffect(effectName:string,loop:boolean = false){

        let audioClip = this.m_soundMap.get(effectName);
        let effectId:number;

        let playFun = (audio) =>{
            effectId = cc.audioEngine.playEffect(audio,loop);
            this.m_effectIds[effectName] = effectId;
        }

        if(audioClip){
            playFun(audioClip);
        }else{
            this.loadAudio(effectName,playFun);
        }
              
    }

    stopEffect(effectName:string){
        let aid = this.m_effectIds[effectName];
        if(aid>=0 && this.isAudioPlaying(aid)){
            cc.audioEngine.stopEffect(aid);
        }     
    }

    setBgValue(v:number){
        if(this.m_bgAudioID >=0){
            if(v==0){
                this.pauseMusic();
            }else if(v>0){
               this.resumeMusic();
            }
        }
        this.m_bgValue = v;
        cc.audioEngine.setMusicVolume(v);
    }
    setEffectValue(v:number){
        cc.audioEngine.setEffectsVolume(v);
        this.m_effectValue = v;
    }
    getBgValue(){
        return this.m_bgValue;
    }

    getEffectValue(){
        return this.m_effectValue;
    }
    private getUrl(soundName:string){
        //return "sound/" + soundName;
        return soundName;
    }
    private isAudioPlaying(aid){
        return cc.audioEngine.getState(aid) == cc.audioEngine.AudioState.PLAYING;
    }
    private isAudioPause(aid){
        return cc.audioEngine.getState(aid) == cc.audioEngine.AudioState.PAUSED;
    }
}


/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting: https://docs.cocos.com/creator/3.4/manual/zh/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.4/manual/zh/scripting/ccclass.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.4/manual/zh/scripting/life-cycle-callbacks.html
 */
