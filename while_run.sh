while true
do
	sudo apt install neovim -y
	if [ "$?" = "0" ]; then
		exit 0
	fi
done
