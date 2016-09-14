@REM
@REM Copyright 2016 [ZTE] and others.
@REM
@REM Licensed under the Apache License, Version 2.0 (the "License");
@REM you may not use this file except in compliance with the License.
@REM You may obtain a copy of the License at
@REM
@REM     http://www.apache.org/licenses/LICENSE-2.0
@REM
@REM Unless required by applicable law or agreed to in writing, software
@REM distributed under the License is distributed on an "AS IS" BASIS,
@REM WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
@REM See the License for the specific language governing permissions and
@REM limitations under the License.
@REM

@echo off

set RUNHOME=%~dp0%
echo ### RUNHOME: %RUNHOME%

call "%RUNHOME%/setenv.bat" 

echo ================== ENV_INFO  =============================================
echo RUNHOME=%RUNHOME%
echo JAVA_BASE=%JAVA_BASE%
echo Main_JAR=%Main_JAR%
echo APP_INFO=%APP_INFO%
echo ==========================================================================

title stopping %APP_INFO%
echo ### Stopping %APP_INFO%

cd /d %RUNHOME%

for /f "delims=" %%i in ('%JAVA_HOME%\bin\jcmd') do (
  call find_kill_process "%%i" %Main_JAR% %RUNHOME%
)

