/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class FGUI_btn_more_game extends fgui.GButton {

	public btn_more_game:fgui.GImage;
	public static URL:string = "ui://shs9kog48p4yb";

	public static createInstance():FGUI_btn_more_game {
		return <FGUI_btn_more_game>(fgui.UIPackage.createObject("export", "btn_more_game"));
	}

	protected onConstruct():void {
		this.btn_more_game = <fgui.GImage>(this.getChildAt(0));
	}
}