/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import FGUI_btn_knock from "./FGUI_btn_knock";

export default class FGUI_KnockVideo extends fgui.GComponent {

	public bar:fgui.GProgressBar;
	public btn_click:FGUI_btn_knock;
	public static URL:string = "ui://shs9kog4gkalh";

	public static createInstance():FGUI_KnockVideo {
		return <FGUI_KnockVideo>(fgui.UIPackage.createObject("export", "KnockVideo"));
	}

	protected onConstruct():void {
		this.bar = <fgui.GProgressBar>(this.getChildAt(5));
		this.btn_click = <FGUI_btn_knock>(this.getChildAt(6));
	}
}