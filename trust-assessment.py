countmismatch = 0
countundecided = 0
countmatch = 0
for a,b in zip(templist, d):
    if (a == 'Yes' and (b == 'R' or b  == None)):
        countmatch += 1
    elif (a == 'No' and b == 'R'):
        countmismatch += 1
    elif (a == 'No' and b == None):
        countmatch += 1
    elif (a == 'Uncertain' and b == 'R'):
            countundecided += 1
    elif (a == 'Uncertain' and b == None):
            countmatch += 1
N = 14
# beta model trust calculation
alpha_c = floor(countmatch + ((countundecided*countmatch)/(countmatch+countmismatch)));
beta_c = N - alpha_c;
Ei = float(alpha_c + 1)/float(alpha_c + beta_c + 2);
print('Beta model is',Ei)


# Formula 7 of trust model
a = 0.7
Eb = float(countmatch+1.0) / float(countmatch+countmismatch+countundecided+3.0)
Eu = float(countundecided+1.0) / float(countmatch+countmismatch+countundecided+3.0)
Ew = (Eb + a*Eu)

rEw = log(Ew)/log((1-Ew))
print('rEw',rEw)
#rEw = log(c)
if rEw > 0:
    wi = 1 - exp(-abs(rEw))
elif rEw < 0:
    wi = -(1 - exp(-abs(rEw)))
else:
    wi = 0
print('dirichlet model is', wi)