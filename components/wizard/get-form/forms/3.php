<!-- Step 4, Payment -->
<h5 class="my-4 b-b pb-2"><i class="icon fas fa-credit-card"></i> <span class="bold">Payment</span> Options</h5>

<form method="post" action="wizard/post-form/" class="form form-account" name="form-personal" id="form-step-3">
    <div class="accordion accordion-collapsed payment-accordion" id="payment-source">
        <div class="card">
            <div class="card-header">
                <div class="radio show" data-toggle="collapse" data-target="#po-cc">
                    <input type="radio" value="cc" name="Payment[type]" id="type_cc" autocomplete="off" checked>
                    <label for="type_cc" class="btn">
                        <div class="ml-3">
                            <p class="my-0 bold color-4">Credit Card</p>
                            <p class="color-2 my-0 text-capitalize">Pay with Visa, Amex, MasterCard, Maestro, Discover and many other credit and debit cards</p>
                        </div>
                    </label>
                </div>
            </div>

            <div id="po-cc" class="collapse show" data-parent="#payment-source">
                <div class="card-body">
                    <div class="form-group">
                        <label for="payment_card_number" class="small bold">Card number</label>
                        <input type="text" name="Payment[cardnumber]" class="form-control" id="payment_card_number" placeholder="Card Number">
                    </div>

                    <div class="form-group">
                        <label for="payment_holder" class="small bold">Card holder name</label>
                        <input type="text" name="Payment[holder]" class="form-control" id="payment_holder" placeholder="Card Holder Name">
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="payment_title" class="small bold">Expiration</label>
                            <div class="input-group">
                                <input type="text" name="Payment[expiration_month]" class="form-control" placeholder="MM">
                                <input type="text" name="Payment[expiration_year]" class="form-control" placeholder="YYYY">
                            </div>
                        </div>

                        <div class="form-group col-md-6">
                            <label for="payment_cvv" class="small bold">CVV</label>
                            <input type="text" name="Payment[cvv]" class="form-control" id="payment_cvv" placeholder="CVV">
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="card">
            <div class="card-header">
                <div class="radio collapsed" data-toggle="collapse" data-target="#po-pp">
                    <input type="radio" value="cc" name="Payment[type]" id="type_pp" autocomplete="off">
                    <label for="type_pp" class="btn">
                        <div class="ml-3">
                            <p class="my-0 bold color-4">PayPal</p>
                            <p class="color-2 my-0 text-capitalize">Pay easily, fast and secure with PayPal</p>
                        </div>
                    </label>
                </div>
            </div>

            <div id="po-pp" class="collapse" data-parent="#payment-source">
                <div class="card-body">
                    <p>Please click the button bellow to start PayPal express checkout process and pay securely</p>

                    <button class="btn btn-primary" type="button"><i class="fab fa-paypal"></i> PayPal</button>
                </div>
            </div>
        </div>
    </div>
</form>
