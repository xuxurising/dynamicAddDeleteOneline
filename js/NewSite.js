/**
 * 
 */
/** 全局变量 */
var siteoperate;
var siteid;
var addORedit;
var stationid;
var addimgurl = "./img/table_ico_add_norm.png";
var cancelimgurl = "./img/table_ico_cancel_norm.png";
var text = " <tr><td><input style=\"background-color:transparent\" class=\"form-control form-input\" placeholder=\"请输入设备名称\" name=\"devName\" type=\"text\" onblur=\"testDevName(this)\"/></td><td><input style=\"background-color:transparent\"  class=\"form-control form-input\"  placeholder=\"请输入设备编号\" name=\"devCode\" type=\"text\" onblur=\"testDevCode(this)\"/></td><td><input style=\"background-color:transparent\"  class=\"form-control form-input\"   placeholder=\"请输入设备数量\" name=\"devNum\"  type=\"number\" min=\"1\" max=\"9999\" onblur=\"testvalue(this)\" /></td>"
		+ "<td style=\"padding-left:75px\"><img src="
		+ cancelimgurl
		+ " class='deleterow' onclick=\"del(this)\"/>"
		+ "&nbsp"
		+ "<img src="
		+ addimgurl
		+ "  class= 'addrow' onclick=\"add(this)\"/>"
		+ " </td></tr>";



$(document).ready(function() {
            add();
		

			$("table tr:eq(1)").find("img[class='deleterow']").hide();
			// 表单验证提交
			$("#newsiteForm").Validform({
				tiptype : 3,
				label : ".label",
				showAllError : true,
				beforeSubmit : function() {
					constructsiteobj();
					return false;
				}
			});

			
			
})
		


function constructsiteobj() {
	
    //设备三个参数都填才有效
	var deviceobj = '';
	var devinfoValid =true;
	var devnumValid = true;
	$("#devicelist  tr:not(:first-child)").each(function() {
		var _this = $(this);
		$("input[name*='dev']", _this).each(function(k, v) {
			if ($(this).val()) {
				deviceobj = deviceobj + $(this).val() + ',';
			} else {
				//如果发现有空着的就提示不能为空
				deviceobj = deviceobj + '#' + ',';
				devinfoValid = false;
				flag = false;
				return  false;
				
			}
		});
		$("input[name='devNum']", _this).each(function(k, v) {
			var number = $.trim($(this).val());
			if(number<=0){
				devnumValid = false;
				flag = false;
			}
		});
		deviceobj = deviceobj + '$';
   })
   
   if(devinfoValid==false){
		top.art.dialog({ title: false, content: '设备名称、设备编码、设备数量均不能为空', contentTitle:'操作提示', icon: 'warning', width:"460px", height:"100px", lock:true, ok:true });

	}else{
		deviceobj=deviceobj.substring(0,deviceobj.length-1);
	}
	
	var siteobj = {
		"deviceobj" : deviceobj,
	}
  if(flag==true){
		addSite(siteobj);
  }


}
function addSite(siteobj) {

	    var _url;
		_url = global.appRoot + "/request/order/toAddSite";
	
	$.ajax({
		type : "get",
		headers : {
			Accept : "application/json; charset=utf-8"
		},
		url : _url,
		data : siteobj,
		dataType : "json",
		success : function(ret) {
			
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			

		}
	});
}


/*******************设备增加删除按钮********************/
function add(obj) {
	//判断改行是否三个全部填写并且 设备数目是数字
	$("#devicelist tr:last").after(text);
	showBtn();
}

function del(obj) {
	$(obj).parent().parent().remove();
	showBtn();
}

function showBtn() {
	//只有一行，则只有加，多行，最后一行有加
	//只有一行，则没有减，有多行，都有减
	var rows = $("#devicelist tr").length;
	//减少表头
	rows = rows - 1;
	if(rows > 1){
		//多行，则全都有减，最后一行有加
		$("table tr").find("img[class='deleterow']").show();
		$("table tr:not(:last-child)").find("img[class='addrow']").hide();
		$("table tr:last-child").find("img[class='addrow']").show();
	}else{
		//只有一行，则只有加,没有减
		$("table tr").find("img[class='addrow']").show();
		$("table tr").find("img[class='deleterow']").hide();
	}
}
/*************************************************/



