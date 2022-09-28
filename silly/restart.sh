#!/bin/bash

app_name=sillyGirl

log_file=/root/sillyGirl/logs/sillyGirl.log

echo 将要启动的app包:${app_name}

pid=`ps -ef |grep "${app_name}" | grep -v grep | awk '{print $2}'`

echo 将要杀死原来的进程$pid

kill -9 $pid

echo "$pid进程终止成功"

#kill -9 `ps -ef |grep "${app_name}" | grep -v grep | awk '{print $2}'`

sleep 2

echo "判断app包${app_name}文件是否存在，如果存在启动${app_name}包"

if test -e $app_name

then

echo '文件存在,开始启动此程序...'

# 启动app包，指向日志文件，2>&1 & 表示打开或指向同一个日志文件

nohup ./"${app_name}" > ${log_file} 2>&1 &

#tail -f ${log_file}

echo "$app_name 启动成功..."

else

echo "$app_name 文件不存在,请检查。"

fi
