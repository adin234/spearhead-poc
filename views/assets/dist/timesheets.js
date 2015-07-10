$('input').bootstrapMaterialDatePicker({
	format: 'YYYY-MM-DD HH:mm'
});

$('body').on('click', 'a.add', function(e) {
	var cloned = $('tr.entry:first').clone();
	$('input', cloned).val('');
	$('input', cloned).bootstrapMaterialDatePicker({
		format: 'YYYY-MM-DD HH:mm'
	});
	$("table tbody").append(cloned);
});