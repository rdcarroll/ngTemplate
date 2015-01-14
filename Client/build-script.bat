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
if not exist %_projectDir%dist\css mkdir %_projectDir%dist\css

echo Concat app JS files to dist/ngApp.js
cd /d %_projectDir%\Client\src\app && call :ConcatFiles

echo Make Angular templateCache and Concat to dist/ngApp.js
call :TemplateMaker

echo Concat common JS files to dist/ngApp.js
cd /d %_projectDir%\Client\src\common && call :ConcatFiles

cd /d %_projectDir%\Client

echo Move CSS to dist/css/ngApp.css
set srcs=vendor\app.css
set distpath=css\ngApp.css
for %%i in (%srcs%) do call :ConcatFiles2 %%i %distpath%

echo Move Angular to dist/angular.js
set srcs=vendor\angular\angular.js vendor\angular\angular-ui-router.js
set distpath=angular.js
for %%i in (%srcs%) do call :ConcatFiles2 %%i %distpath%

echo Move Assets to dist/
set srcs=src\assets
set distpath=
for %%i in (%srcs%) do call :MoveFilesFromDir %%i %distpath%

goto PostBuildSuccess

:ConcatFiles
setlocal enabledelayedexpansion
for /f "tokens=*" %%a in ('dir /s /b') do (
	set file=%%~na
	set ext=%%~xa

	if !ext!==.js if "!file:.spec=!"=="!file!" type %%~sa >> %_projectDir%\dist\ngApp.js & echo. >> %_projectDir%\dist\ngApp.js
)
exit /B

:ConcatFiles2
setlocal enabledelayedexpansion
	type %CD%\%~1 >> %_projectDir%dist\%~2
exit /B

:MoveFilesFromDir
setlocal enabledelayedexpansion
	copy %CD%\%~1 %_projectDir%dist\
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