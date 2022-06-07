const VendingMachine = artifacts.require("VendingMachine");

contract("VendingMachine", (account) => {
    before(async() => {
        instance = await VendingMachine.deployed();
    })

    it("check whether the starting item balance is 1000", async () => {
        let balance = await instance.getVendingMachineBalance();
        assert.equal(balance, 1000, 'The initial item balance should be 1000.');
    })

    it("check restocking items", async () => {
        await instance.reStock(100);
        let balance = await instance.getVendingMachineBalance();
        assert.equal(balance, 1100, 'The balance should be updated to 1100');
    })

    it("check purchasing items", async () => {
        await instance.purchase(50, {from: account[0] , value: web3.utils.toWei('3', 'Ether')});
        let balance = await instance.getVendingMachineBalance();
        assert.equal(balance, 1050, 'The balance should be updated to 1050');
    })
})