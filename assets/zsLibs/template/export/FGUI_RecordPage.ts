/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import FGUI_btn_share from "./FGUI_btn_share";
import FGUI_btn_drop_share from "./FGUI_btn_drop_share";

export default class FGUI_RecordPage extends fgui.GComponent {

	public btn_share_area:fgui.GGraph;
	public btn_share:FGUI_btn_share;
	public btn_drop_share:FGUI_btn_drop_share;
	public bg_record_group:fgui.GGroup;
	public static URL:string = "ui://shs9kog48p4y5";

	public static createInstance():FGUI_RecordPage {
		return <FGUI_RecordPage>(fgui.UIPackage.createObject("export", "RecordPage"));
	}

	protected onConstruct():void {
		this.btn_share_area = <fgui.GGraph>(this.getChildAt(3));
		this.btn_share = <FGUI_btn_share>(this.getChildAt(4));
		this.btn_drop_share = <FGUI_btn_drop_share>(this.getChildAt(5));
		this.bg_record_group = <fgui.GGroup>(this.getChildAt(6));
	}
}