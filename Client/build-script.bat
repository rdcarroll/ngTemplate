@REM Store args...
set _configName=%1%
set _projectName=%2%

@REM Remove quotes from remaining args...
set _targetDir=###%3%###
set _targetDir=%_targetDir:"###=%
set _targetDir=%_targetDir:###"=%
set _targetDir=%_targetDir:###=%

set _projectDir=###%4%###
set _projectDir=%_projectDir:"###=%
set _projectDir=%_projectDir:###"=%
set _projectDir=%_projectDir:###=%

@REM clean /dist folder
:CleanDist
echo cleaning distribution folder.
Del %_projectDir%\dist\*.* /q

@REM Start post-build processing
:StartProcessing
echo Starting post-build processing.


@REM Concat app JS files to dist/ngApp.js
cd /d %_projectDir%\Client\src\app && call :ConcatFiles

@REM Make Angular templateCache and Concat to dist/ngApp.js
call :TemplateMaker

@REM Concat common JS files to dist/ngApp.js
cd /d %_projectDir%\Client\src\common && call :ConcatFiles

goto PostBuildSuccess

:ConcatFiles
setlocal enabledelayedexpansion
for /f "tokens=*" %%a in ('dir /s /b') do (
	set file=%%~na
	set ext=%%~xa

	if !ext!==.js if "!file:.spec=!"=="!file!" type %%~sa >> %_projectDir%\dist\ngApp.js & echo. >> %_projectDir%\dist\ngApp.js
)
exit /B

:TemplateMaker
	setlocal enabledelayedexpansion
	set var=angular.module('app').run(function($templateCache){
	set cpath=%CD%\
	for /r %%a in (*.tpl.html) do (
		set fpath=%%a
		set var=!var! $templateCache.put('!fpath:%cpath%=!',
		set html=
		for /f "delims=" %%i in (%%a) do set html=!html! %%i
		set var=!var! "!html:"=\"!"
		set var=!var! ^);
	)
	set var=!var!  })
	echo !var! >> %_projectDir%\dist\ngApp.js
	exit /B

@REM Failure labels
:CopyFailure
echo Post-build processing for %_projectName% FAILED: Failed to copy file(s) to common assemblies directory!
exit 1

@REM Post-build success
:PostBuildSuccess
echo Post-build processing for %_projectName% completed OK.
exit 0