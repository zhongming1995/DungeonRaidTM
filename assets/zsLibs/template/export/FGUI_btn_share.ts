/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class FGUI_btn_share extends fgui.GButton {

	public btn_share:fgui.GImage;
	public t0:fgui.Transition;
	public static URL:string = "ui://shs9kog48p4y7";

	public static createInstance():FGUI_btn_share {
		return <FGUI_btn_share>(fgui.UIPackage.createObject("export", "btn_share"));
	}

	protected onConstruct():void {
		this.btn_share = <fgui.GImage>(this.getChildAt(0));
		this.t0 = this.getTransitionAt(0);
	}
}