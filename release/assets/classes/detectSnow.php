<?php

$date = getdate();

$month = $date['mon'];
$date = $date['mday'];

if($month == 12 && $date >= 20){
	$class = 'snow';
}else{
	$class = '';
}

switch(true){
	case ($month == 3 && $date == 8): $class = "holiday-8th-march"; break;		// Международный женский день
	case ($month == 2 && $date = 23): $class = "holiday-army"; break;			// День Армии
	case ($month == 5 && $date == 9): $class = "holiday-9th-may"; break;		// День победы
	case ($month == 12 && $date >= 20): $class = "holiday-new-year"; break;		// Новый год
}

echo $class;