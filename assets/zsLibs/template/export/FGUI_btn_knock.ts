/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class FGUI_btn_knock extends fgui.GButton {

	public btnKnock:fgui.GImage;
	public static URL:string = "ui://shs9kog4gkalj";

	public static createInstance():FGUI_btn_knock {
		return <FGUI_btn_knock>(fgui.UIPackage.createObject("export", "btn_knock"));
	}

	protected onConstruct():void {
		this.btnKnock = <fgui.GImage>(this.getChildAt(0));
	}
}