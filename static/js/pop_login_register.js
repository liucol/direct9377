$(function(){
	var _dialog = new P8_Dialog({
		className: 'login_register_box',
		element: $('#login_register_box'),
		title_bar: $('#login_register_box .hd'),
		content: $('#login_register_box'),
		close: $('#login_register_box .s_close'),
		keep_center: true,
		width: 458,
		height: "auto",
		overlay: {backgroundColor: '#000000'},
		content_height: 'm'
	});
	
	(function(){
		var $tabs = $("#login_register_box .tab");
		$tabs.click(function(){
			var index = $tabs.index(this);
			$(this).addClass("on").siblings(".tab").removeClass("on");
			$("#login_register_box .tab_content").eq(index).show(0,function(){
				//切换登陆或注册框时文本域获得焦点
				if (index === 0) {
					$("#l_f_label").click();
				} else if (index === 1) {
					$("#g_f_label").click();
				}
			}).siblings(".tab_content").hide();
		}).eq($_COOKIE['Puser'] ? 0 : 1).click();
	})();
	
	$('#login_register_box').bind('register', function(){
		$('#login_register_box').trigger('popup');
		$("#login_register_box .tab:eq(1)").click();
	});
	$('#login_register_box').bind('login', function(){
		$('#login_register_box').trigger('popup');
		$("#login_register_box .tab:eq(0)").click();
	});
	$('#login_register_box').bind('popup', function(){
		_dialog.show();
		
		if(!$('#login_register_box').data('valided')) include_once(C9377.resource+'/js/jquery.validator.js?'+build, function(){
			$('#login_register_box').data('valided', true);
			$.validator.addMethod('valid_username', function(value, element){
				return /^[a-zA-Z0-9\_]{4,30}$/.test(value);
			});
			
			$('#pop_form_register').validate({
				rules: {
					LOGIN_ACCOUNT: {
						required: true,
						rangelength: [4, 30],
						valid_username: true,
						remote: {
							url: 'http://static.9377s.com/check_user.php',
							cache: false,
							data: {'do': 'user', 'new': 1, username: function(){ return $('#pop_form_register input[name=LOGIN_ACCOUNT]').val(); }},
							beforeSend: function(){}
						}
					},
					
					PASSWORD: {
						required: true,
						rangelength: [6, 20]
					},
					
					PASSWORD1: {
						required: true,
						rangelength: [6, 20],
						equalTo: '#pop_form_register input[name=PASSWORD]'
					}
				},
				
				messages: {
					LOGIN_ACCOUNT: {
						required: '请填写账号名',
						rangelength: '4-20位的用户名',
						valid_username: '账号名只能为数字或字母',
						remote: '账号名已存在'
					},
					
					PASSWORD: {
						required: '请填写密码',
						rangelength: '6-20位的密码'
					},
					
					PASSWORD1: {
						required: '请再次输入密码',
						rangelength: '6-20位的密码',
						equalTo: '请确认两次输入的密码一致'
					}
				},
				
				errorClass: 'error',
				success: 'ok',
				
				errorPlacement: function(error, element) {
					$('#dialog_tips').empty().append(error.html());
					
					element.next('span').removeClass().addClass(error.html() ? 'error' : 'ok');
				},
				
				invalidHandler: function(event, validator){
					validator.element(validator.errorList[0].element);
				},
				
				onkeyup: false
			});
		});
	});
	// if(!$_COOKIE['login_name'] && ($_GET['lm'] || /server/.test(window.location.href))){
	// 	$('#login_register_box').trigger('popup');
	// }
	if(!$_COOKIE['login_name'] && $_GET['lm']){
		$('#login_register_box').trigger('popup');
	}
	$('#login_register_box').data('set_gourl', function(url){
		$("#pop_form_register input[name='gourl']").val(url);
		$("#pop_form_login input[name='gourl']").val(url);
		
		var qq_param = $('#login_register_box').data('qq_param');
		$('#login_register_box').data('qq_param', qq_param);
		$('#login_register_box a.qq_login').attr('href', C9377.app_url+'/api/qq.php?_qq_action=login'+ ajax_parameters({_9377_forward: url, _9377_param: qq_param}));
	});
	
	//修改注册表单
	if(window['is_blank']) {
		$("#pop_form_register").attr("target","_blank");
	}
	$('#login_register_box').data('set_gourl')('');
	if(window['go_url']) {
		$('#login_register_box').data('set_gourl')(window['go_url']);
	}
	
	var qq_param = {
		gid: 0 /*qq_gid*/
	};
	$('#login_register_box').data('qq_param', qq_param);
});

function _login_form(form) {
	var form = $(form);
	var username = form.find('input[name=username]').val();
	if(username.length < 3 || username.length > 20) {
		alert("您输入的帐号有误");
		form.find('input[name=username]').focus();
		return false;
	}

	var pwd = form.find('input[name=password]').val();
	if(pwd.length < 1) {
		alert("您输入的密码不正确");
		form.find('input[name=password]').focus();
		return false;
	}

	return true;
}