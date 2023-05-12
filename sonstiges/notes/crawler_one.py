f = open('test.txt', 'r')
content = f.read().splitlines()
f.close()

name_list = []
uid_list = []

for x in content:
    tmp1_list = x.split('<option label="')
    tmp1_list[0] = tmp1_list[0].replace('<optgroup label="', "")
    tmp1_list[0] = tmp1_list[0].replace('">', "")
    for y in range(1, len(tmp1_list)):
        tmp2_list = tmp1_list[y].split('" value="')
        if not y == len(tmp1_list) -1:
            tmp2_list[1] = tmp2_list[1].replace(f'">{tmp2_list[0]}</option>',"")
        else:
            tmp2_list[1] = tmp2_list[1].replace(f'">{tmp2_list[0]}</option></optgroup>',"")
        name_list.append(tmp2_list[0])
        uid_list.append(tmp2_list[1])


for x in range(len(name_list)):
    print(f"Name= {name_list[x]}; UID= {uid_list[x]}")
