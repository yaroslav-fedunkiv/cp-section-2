import {Recipe} from "./recipes.model";
import {EventEmitter, Injectable} from "@angular/core";
import {Ingredient} from "../shared/ingridient.model";
import {ShoppingListService} from "../shopping-list/shopping-list.service";

@Injectable()
export class RecipeService{
  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe('Testy Schnitzel',
      'Testy Schnitzel — just awesome!',
      'data:image/jpeg;base64,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',
      [
        new Ingredient('Meat', 1),
        new Ingredient('French Fries', 20),
      ]),
    new Recipe('Big Fat Burger',
      'McDuck',
      'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBYWFRgVFhYYGBgYGBgaGRgYGBgSGBgYGRgZGRgYGBgcIS4lHB4rHxgYJjgmKy8xNTU1GiQ7QDs0Py40NTEBDAwMEA8QHxISHzQrJCs0NDQ0PT00MTQxNDQ0NDQ0NDQ0NTY0NDQ0NDQ0NDQ0NDQxNDQ0PTQ0NDQ0NDQ0NDQ0NP/AABEIALYBFQMBIgACEQEDEQH/xAAbAAABBQEBAAAAAAAAAAAAAAAEAAIDBQYBB//EAD4QAAIBAgMFBgMFBwQDAQEAAAECAAMRBBIhBQYxQVETImFxgZFCobEUMlLB0QcVI2JykvAWM1PhQ4LxJBf/xAAaAQADAQEBAQAAAAAAAAAAAAABAgMABAUG/8QAKxEAAgICAgEDAwQCAwAAAAAAAAECEQMhEjEEE0FRFCKBMmFxocHhQpGx/9oADAMBAAIRAxEAPwCyptcTrLeD0WkuacmOTcaY8kr0OFKNdJKpjarSEv1CEa6QpHlez2ktOpLwloNB5MY0j7SLtIH+oWiUCQ1UvHh524j5FaMyrxGFvH0KFoeVELw2zXfVV06nQTmhiSlaBRBhkhaiWNHYlvvOB4AX+sl/dyKbWZvM2HynctIbi2VgEREtXwqD4Dp42iOFpEXs3obwOSejcJFUI1zLhdloRcFh52kNTYxP3XHrA060LxZVXkgaEtslxwym3jYyFsI4+A6TRVGoYzSMvE566QZ3lLNQQHkgeA548sYJSpGoIZgZGaYkS3k4WJHewgmJTSAhdZZV0gZSZ9jo4ojxHKseqRkBkdo5RJeyjgkItjVEmUTipHqswToEUeBFMYqWSxkNRpZV6cCanrIyjQFI4rGMqvHuLSE6mefKX30a9g2IYxU6hhLUY00J2Ri6sexLVMd2sYyWnFWTTfKhb2TCtLDZ2Cer90WXmx4enWLYmye1bM+iLx/mPQTYKABlUAKNABpOlq+x1GwbCbLppyzHmza+w5Q3OF4C/Lp8pCz8oi9hMpJdDcBgc3uNJ01AefnIiY2JyZTihVQffhFSA04nyPynO0084wtx6n0itpOxqdUE1KhHE+QBuZ16hcWAtrxvb3tK7qfrJaNcqRY6aXPGGOW3voDx0tdhJV10Itc/e5ThDAgXF+pFh785EcXZtTmH+cI2pjMykeOmukZyj8i8X8E7Jr3srX4gj84DidnIxOTun3U+XSdDGw+nK3KGUKmoRgOFwR48NYYzvQJQ9ygq4ZkNmHryiNpoDqveAa3EcwPzlbicGDqmvVefmIz2SlF9gKmPziDGpI3rR46Qg/EVRBBU1kdapIVaKx0WCOJMjCV6vJadSMmKyzW06QIKrx/aQ2gEojwYJ2seKk1hoKvFIA8U1mDK+GMr6lKxmrq0RKvEYMkwyjaJlE6SILLHE4crKjE17ThlBRlbCEgiONpVJitYYtS4l8c1JBsdUAj8Nh87BBzMDd5f7rU7lnPwiw8zIX94Y7lRf4akEUIo0AjmBE6esiRrx3L5OpL4OzhMe5tIWaK3Qy2djGMY7yN2tF5IPETmQu0bUq2vIVq8yZKUrKqI/tIhUtx6/wD2Vz1yWsOHOTFz5nS0SMxnEMFTvefpJHpX42Go0v4fTSBrUsdYVQbU+XPlKQkpaZOSromyG5AvbiefDnr/AJrJk0YjUL1NibDpILefC0nUaWueHz4zoiyUh6AX4kWHoZysmlxofDh4EeEaEjwIyeqoT3KXamFuM6/e+Mcj/MJTm82DJfSZvaFDI5HI6j9JSMvZiSiu0AGnEKckvFmmYtDOzj0SOUyZFkMubgjM4pMkJnVETThXm77FI49DIi8kRp3Yc6mEkvOxXinTZjaGNZBG5omaXJlNtqwUzz7H4y5I6Tc7xVLI3lPKnqFmPnPN8u+VIlOfHRYYTE96XVHEiZ2nTI1kwrkTnx5OKpDRbrZd1Hmt3SP8Fj/OfkBPPkxN5vN0nVcPq4uzsbX4Aaa+02PJeTZXE7lo0JUETi0woueMqMTt+khALISb8HXlrKvE774cEqSP7v8AqdLyQ/J2xw5JdI0z3MGrPaZCrv8A4caWJ8m08+EFrftGoH/xG39Q/SSk3JaTLLBNdr+0bFqmvpfTyjGb6c+kxH/9FoDXs39GH6R1X9ouGa2ZKt+dslvr+QgWOddMzjT9v+zWG5BtB3e2koaP7QMGQRaqrWNiyqVvbS5DH6QM74YVeGdraaAa+V2k5Yp9UxotM0qi2sMopm6e+ukylDevDMVLsyA8LgsNORy3seHvDn31waAqhZmINmygJfle5zfKaOKV7QZJ+xesmuhhGG42/wA9ZmMNvbh2OVWXNcKCe4Gvz71rQ997cGG7Fay3BKtxW7DQ94ix18Y8YNP/AERlrs0VM9OMmFQDjpKbBbSpORkdWPCwIPLXh/msLrOCdBcgcevDj+U6FJVog4u9hhxSWtfx8pMjqwupvKpn8JC9dU1Btx4G0POuwcb6L7JKzbOFzJm5qflzhWDxWZVMfiyCjf0mO6e0JtaZkHW0hLSfFt0g4UnlNdi8iZDCEaDoLRr1JDPi5IL2HoZ15XpiJOte4nlz8ZoWgfEGxjaWI5RuJaN2bRzP5Q+PzhKh4xvRoMLhrrcxSwpJYCKer6hf00WeaNd5EbwPFViBznoM4Ct3gbMhAmEXZ7XOk2VfEKxtJaeDUi9pxZsSySuwOCltmUTD2XUSvxCTT7TphZn8UwtOXJBRVBoCpVLGWOGq21BtKZzrDKFTSc04+5Hk4yObRwa1WUW1vwGhYnhciX+G3NouoWo5BAtoAbepguxFXtc7kDIpIuQLsdBx8zL2m5Gun9yfrGWbhV7/AMHt+BB5YOUpfwVbfs4ww413t0GW8Jp/s4wYUn+PUPIBkBHiBpf1MlrbRZdbD+9PyJklHeS2h09f+p0w8qPTs7peJNq40yjX9nRZiQopprbtHDv5kJcel4aP2XUtSatullJsOmp159Jp121RI1qoD0Zgp+ZkGK2/h1H+6t+l9fmfGdKnH5/si45W0lFL8GE25uRToKWWpmt1W35zJPg16CbLbm3BW7qgkHhew/OZx18vcfrJeq29HpY/Fhw+9KypOEHT5mMOGHjLFrdR7iRNbqPcSinIhPxcS6oB+yjxiGEHjDgvl7iS0rAjpfzh9SRNeHjfsAU6LIbq7KfAlfoZZJtvFKLdvU0Fr6Frf1EX+cuVwqOoZSLj/wBT5ayB8OjHKWQHmcy3i+pfasC8XH7aK+htiuGJNeqt7X1La9bXmu2XtavVQItWlVI/GuV/IqeMoTsC9srpY9SOEsV2AtEpUVyWVgdLRJrktaBLHFa1f8GpwGKxNNCrU1dtbWORR00sbS02U2IdGFYKCxFgpzAC2o4SLAVM5E0WEoWlMWLSbbPIyZW7TSTK5dljpGVdmAcpogkZUS86eKOejGY2iUlZUM120sLcHSZLFUyrWiSQyYKzToqERERjCTcE+xrJDUvLvd/D370zbNNnuul0Bk5Y0loeDplnkihLLFJcGX5kZxSwTE1FPKTdlflO9gLT1DzynfDgwmlTsJN2VzIse2RCfCTcV2ZMy282IC31mUbEgiO2zimdmueZlNSqHNaedP725InKTTLEawzDrA6a6QzDvOafQGk2FVaFxYTT4HdSsEBLkMRw5L4a85JuXhA7s7AEIBa4v3m5+gHzm3q1AonRDx4yhcjqwtwdrsxn+is2ruWPVjK/Gbk0gLioo9Wt8pTb6b9Vu1ejSZRTQ5cyk5mOXXUcAGuNOkw1PbNVVYdrUuzEnvsBrx9T1BEvHx41qz0F5eaPcqPQKu7VEd1aoJH8pv7SrxO7oW57RQB1uOXl4TFuw0Oe7G5LAOGueIJPHzj2xIykBmAa9xdiTwtmubWt6wvx66Y8fOy+7L2rsv8AmuPDnIl2UTwuZVYXG1BpTJNuVswHvwHHpNNu1iKzuFNNr3GtrDjrrJyx5I9Md+VKRUPsdyQoBuf81hFHdesdSpHpPRE27he8rgLUXiWGgtzzXAtrcxfv2gzpSV0zO2VbfdBIvqRewt9RNyn0n/RGWeV7Rhqe6lQ2veFpukRa5nojYQIbE3I9R42jvsinvA6WsRfh4jpFfO6bE+ql2jEU9yAym5sddb/rAhufkuWZcoubkgCw6y42ptu9Y4amxGQd9ltctyQX9z7SqVajuc72ph7ZTqGF7WJvcfr4SkccmtNhWafbYBs2nhalSxKlblcpulyeBUg8dJp32Ph7ALTy25gm/vM1tTYNCnne+S+VlF8qobgWBFyAZpt2KprIFaxZVU3BvdSSBfx7plvSXTFn5ORK0zRbDoWAUEkDmdTNVRXSZ/DOtL7xtLXBY9HF1NwOdiI8ZwT4p7+Dik3J8mHsZGXg9bEjrA2xd+EZySFCsQwtMrtWmCTLmtjNJncfXuYk5qMbYQVad48YW84jiH0BecD8tXSYSqrYSWmw9pCn3G0kr0bwGrQ1lFm1spjVySL2vt5L8ZyYvGLdopyfVM96PgY2kerGnIqqaQomDYprLPfPmQWmlxeZ/ePEZEaaeiO7MFv3ibC0jmdRbA3SMViTmJjKOHA1kK1JIcQJ5tNKkRk7DwukVLjAhiCYRSqWknFpATPQN1K60cPVrs1wOKC1xlv15m8ye+G/T1P4NEsikEO3Bifwqb6eJldttaiCkUZz2iXKLcXIa4uAe8INs3Hmiys1JGqZ7XqKHKqMpGUHQG+Y5vLpOvFF0nLo9rFhSgmu+wTZW62Ir2YIURmsHfQE87LxP/2W2M3ArK2VSzkWzELlJ4Xyrrcd5efPlNi+MrVkd0oIQujKaiueF75GsBa9wb69OtfsfbFcZ37ZFRDZUqB6jPfiwZbtfujje1+kt6itfAqg6bdfwZ/ae79Glhx2qPTYkFCWLMzWGfS1soGnLW0kxeCwdFVprTbtldSFdWbtEewBbXhYg6aG9tYBtnalfEh3qOiKn3UclSe9lAQAd5h3ulheD1sVUoig5b+KyrUzkgsi5nVUFj3VyhWtobtCk2uyiUYta3/RvttYWnTpKcgBYKxQhEUagDORbXRbgaa66G8yf+rqmWoFAuUKZviy3FiHAuCPPn5GB4R67CpiCwZBlLGpYh2JDKoB+8wNm9utjVPiHoVGZSrhgQGdA6tmFicrXGblfx8YIxTf7mb4re0N+0uovcAMTe1tQbhltzGvDxMssdtVXKsodWDl2Yd0qSFRcpHwhVA1171jfSZ9XuOPDgOgP+GFV6DIouVOYG2U5tPHoOHvKVWheSkr9jf7B3pZwErECpyIOjjrpwNuU0VfaSpRqNmCnIbE/i5D3t7zxdKhWxBsRrpxFuFpYVdq1HVVZ2IudDYKOQNxxPnwtOWeCXNSi9e4tReiChjKjVGcN3+Z695R9TNFsraRbMtZdMxV+l9Rw5cOfh4TJVzZ2IN7k6jQa8fSHpjXVS2c3IsQLd4m9yx5+U69LoRNvTNjXu6OqZWyh7Z+9r0tqeN7S3/ZzsjsaJxDsQ1TQJ8KqhNjbqdZg9k7Rqg5A17qb3W+ViNCTzIv+U9C2LnemquWKouirYdoeJvoLX6TmzZeDpdsE649hGIx/auwQEgmw/WXWDUopQkaW9+cBwpdAAyKHZu6ifdRed25nxh9ZwBI4cT5Ocns5pO+gTG4mwNzAcNjR1gO18SZSpVJOknPLJTpAtGqq4rxlRXq5jBlJOlzJkomSzznJUloJLTMtsGDAMNS1lzh0tOLHFuVmsmy6RjYPMLyZjpwkmHqnhad0bY0ZOLtGYxmGyta0U0WIwgY3tFBUPg6l5ub5NAHg2KflEKokFepcie9ZwBZay+k8n34xWapl6T0zGV7IfKeNberl6zHxnP5D0kLLorHaRgmFJhyZd7vbPwzN/8AoqFWzrkTLdH652tYA8LaTl5JEk90UmHMJBm8x25Cs2aj3ARcg3YX5WF7gQHEbjuqE9oC99BkYJbxOpBkZTT2N6bAXo9tXRBUFK4K5wCWtluAACOJFuI4yyp7vUFQ/aD21RmJZwXTKNLAWIPDUnXjDsNs16dNVdEZs2ZxpUD8LWzr3TYAWA66xuNpvUJPdVCScxYdyw4MnHjppecuXPP9MXXz/o78mabqMdIMKIzlSLq1N0A4qAcrWI6dy1/KZldnsuLSiDnFcEUwwtoFLEuy2HdyeoN7GWdLBVwL3QqCLEOTp1Glx6iGptWrTbKtINZXuQyls+Q5LLpzsNWEXBllCVSdr+SUM0omC29u1WwwZqtJmLklSt3RAG+8SvG4HO3E6TPLT7wDqQvFiBwXr042F57WHtUUMx74WzL3O8RrcHhry5XhWPwOdtTdbWN6edgp0Nr+s7sfltrr9ux3nk+0ePIKlRWo08mRM7ZmZUDBTdijORfQXsPlKjFYmrVKp3mI0VQtzoOAAF56/tLdLZdFRmonn3u0cG41PxAc+QtLTZG72HCK9KmiK693IuVyuv33N2b31vOhZop1FWzTzykqPBzSenfMpXUceN9dP+pJhcFVqn+HTdx1VSQPM8BPcKtLAU8+cUQEN2zKGs3XUG/DlHYLb2Grq3Y1FypcuSDTCqFvmKsAQLA62tN9Q3G0tipz466PJMPufjHH+2F/qYAn2vDP9BYnmyX6Xb9J6zg8XSdS6OjplJLBgQLC+vSw43gezNsUsR2hQ3VGVQ+lmJW7ZRx005c/CJ6uRq9L8Cvn7+x5f/oTEc3W4tyJGvj6R9LcLEtoXpqp594n2t68Z6ycth43iDJ90HUC/poL+8T6jIu2heTMXsPcYUu81TtG6BSiqPfvEzVVEXu00YK44hbXXTjY+Y94b9nuDxseVyAb8OB8YXhcMlNQosAOQHAnU+evWN+vb/JSKTQBkKg6aDmTcsf1kDUnblNEiqb6R6UBOqELW2JLXRisVsJ6h6RuH3StxJm8WmI8IIy8bHd0IZTD7tKsOTYidJfhRHASnpw+DFOmyEHKEpgFHKWEUHpQ+DAX2MdJz7IIfOGZwSWgopMRhzeKWzU7xTz5eNb7KaMytQxyG5vI0SEU0nfHokB7We1M+U8vq4Us5PjPTdvCyWtxmSp4JybhG/tM5PJ5ckkMoKS2V1HBACRVcCeU01DZ1Q/AZP8Auaofg+YnP6cn0gejEzdPamMQZFrvlsBrZiAOADEXhOE27jFsjVWZc1zcDN/da80CbAf8Ik6buv0EPpT+CsIqLTsym09v1iahJdCandGhVQo1XUak3GtxAU3lqILsVqXHCzIwPibEGb3FbstUptTYgA2sctyrD7pvx8PIzz+ruziRV7I0je9s3wW/Fn4W59fCF4I190Ue1jfjZ49JNEv75xNZV7OmVZWBzKzFCPwsjd0/5a0s8VvRVp00Wqj5rEd1+4eHA3v6G/nLPZeweyULmJ666E87DlCsbspHQo40JPmDyIPrOaSg3XH7fzZCWLC5daKnYm9iVGXtglFEYZDq5J1udehsbnTXwkO1/wBoeIUkUVpZTfKxvUYAHRiNAGNuBvBMRuaQe7UFuQZbH1IMiG6Lc6g/sJ/OXi8UXa/yOvF8fuwPaO3HqpSFWqKlTtAzNlyoqH4GChb20P8AdPQf9a0FRTfKVJU0xYkWCklSumWxNjzM8+xW7FZfu5XHgcpHmG/WS7N2A+YNWARRrlJBLHlw0A/SUc4pNpm+kwVbZaVKDYh2erls5uFy6cTqRwDWte3SWNPYVDKn8NfujQC2Ysdc3Xl7TqYimBo4NtNLv9AYQdooNQC5toACPmRbmZxKbvbM1S4xVIgxG7dNmC0x2aqO+6d1mv8ADm6WvcRlDAJhlYItrnQ3JLeJP+cYamLLgFxltwXNcH+Zh1kiOp42I4m/CNKfJcUznyY5SVNkLGrYFfLQ8B76SwwyBWJa13XKNb2N7nXztAquKuVZSAuosRy5EdLn5WjKm1kHMaa9LWiRik9uyMfE/JoMxHjpx429OUciltS5t4eUy/7+F9D85Z4LbAYjXjp4+E6Y5YXTKejKK0jR4ZMiqLkmxuTxOtxAcVtCorkKtwLa+msf9qAFzJ6NIOuYaan1nbjmuonLOLe2A/veoPgMR3iZfvI3tLD7EesiqbOuOUspSJ8UCLvanMEehkib3UfxfIyq2jssJ3mZEH85C/WUVbG4ZTYupP8AKrsPcLD6j+Dcf3NuN66H4xHrvRh/xj3mRwuGSouankccLqQdengZzEYAJ95QPOH1AcTZLvNh/wAa+4ki7yYf/kT+4Tz6rTQfCD8vmYK9JPiVfJTmPygeRGUWel/6kw//ACJ7icnl7U1+GkAIpO2PR6WnZjTUyamb/dSEYfZ44mGrTtoJRJi6K7ssxsbXAvbwMlXBjwhRQcec5rDXyayJcMslWivSdvFeEwgg6TuXwjbmQCqWupulmABBvfS/MadIsnQUrC7QLH4EONNG6/rCMh6yGphyfiMElyVNBi6dox+1q32cd8AL+INcfrKyltqgxurD+6/yvNJtrdZcQpVrEeJ+kw+P/Za970nI8DqPeckvGt91+DqjmVbX9l6cUjaq9vY/WB1a/H+KLHh3QCPUGZipuNtCn91gR4MR8rQKvu5tEcabN/S1/rJy8Rv/AJIrHND3v/0174pLd/I3iNfXXhAMXtGmONvlMjWwGLQXelUUdTw+sYNn1mpmrlsoOW5IBLZS1gL6nKCYv0nyzohKLVpN/g0h2si8D7Rr7cFu6Zkstb/jfwOQ6+ttZzJW/wCJ/wCxv0lF4UTfVYV7M2VLaJOpPpFidrquha40IHK9gdfn8pkBTxJFhSqW8Eb9Il2Xim/8NQ/+pEC8GN22JLy4eyZdYveB20W8AOKY6sx110I6nj04RtPd7GHhQceekLp7oY1uKW8zLrBCK1QF5aXscpY0Dhx9/rNPsIue+il+V7gKPIk2lDU3b7GzYl7DkBpf1ibaNGmtkvp5mB+Ip7sTL5yqkj0PDMB38Q6joinN7t+kOqb2UEUBToOAGk8bxG3HbrC9lbPxFfVEYjqdB7y+Lx1HSOCeVy2z0PFb9n4EHrrKDHb3Yl9M5UdFOT6awCpsCqhs9l8b3kDU8On+5ULH8KNYn5S3ppdkuRBiMSW7zHXmSbk+pkdAM7ZUV3P8qkj34fOEfvWgn+1hkvyesxqH+06fKC19uVWBVqjEEWyp/CUag93Lryt6mGooP3M0WwlehVOayFksKQbM5YEFXYcAQM/P4pZYnGrmu9QL10NR/S9gJn93tnVQ/ahAmhy3FySwtma/gTx/KaHDbHUasMxP1kpN3oaMfksNm1MGxuUd2/FUuw9F+6PaM2zSLa0lHkBaWuB2Ox+EIPnLrDbOCcrnrBTa2HSPMquJKmz0XB/pOsU9XOHHMA+YBii8H8h5x+AvL4xZiPGNzTmaVJknanpF2nhI80WaYxLnE6GEHvGlpjBRIPORPhgfib0aQZp3MYGk+w3Q9MGFNw7+rXHsdIRAy5nDVPjMkl0Zu+w2cKiBGuesacUesJg40xOdkOkC+2HrGtjmHSCjD9obFoV7dqgfLe176X42t6SrbcrBnTsza97B3Av1tmhjbRfkBODabjkIrhFu2i0c+WKqMmkPwG79CiCtNLA8izOPQMSB6Q4YNPwj2gH70boPeRnazdB7wpJdCOUm7k7ZafZE/CPaL7Mn4R7SrO1W6CRttV/CYGy5+zr+ERdgvQTPPtdxwy/OQ19sVRa2XXzmNsi37waLS7ZqRqZNcqi510Jt4TyXG7yUm0SgB52nrGI2rWIt3LeRMzG19hU6xzOoB/lAF4bNR5o+NF7hFHpLvC724migVAgB4Ei5+sta+59IDQteCHdwaAk2EXlT0HjfZR4/bGJrHM7sfLuiC4bDux0Uk+E2+C3fpWsQT5ky8w+zKaDuqI3KxeJjMBuzVqfeIQc+Zmq2VufRQgnvt1bW3kJZonIDzP5QtGA5AQcg0G4bZVhoLD0AlxhqSJ+EeJIlHSqnnCEfyhQGXhxSD4l9NfpGvjVtxY+Qt9ZUh9Z3Pr1hMWf20ckPqQPpOSu7QTsxqLwmcvOxTAFecYxRTGGGRtFFMYaTEHiiihGM5nc5iimMRmqRI3cxRTBG69YxnnYpjED1Twjc1oopjCzxhqWiimMNNSRF4ooDED1zciD9sbHwiihYUNXEEiI1DFFAYaXPOAuNTFFAEkHIyenUMUUyMPvc2kiH2EUUICdOUIDcoooQEqtyji3L3iimMdzeEUUUxj//2Q==',
      [
        new Ingredient('Buns', 2),
        new Ingredient('Meat', 1),
        new Ingredient('Tomatoes', 3),
      ])
  ];


  constructor(private slService: ShoppingListService) {
  }

  getRecipes(){
    return this.recipes.slice();
  }

  getRecipe(index: number){
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]){
    this.slService.addIngredients(ingredients);
  }

}
