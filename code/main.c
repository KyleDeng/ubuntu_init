#include <stdio.h>

int say_hello(const char* name)
{
    printf("Hello, %s\n", name);

    return 0;
}

int main(int argc, char* argv[])
{
    int i;
    const char* name = "KK";

    for(i = 0; i < argc; i++) {
        printf("[%d]: %s\n", i, argv[i]);
    }
    say_hello(name);

    return 0;
}
