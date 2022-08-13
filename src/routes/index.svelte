<script lang="ts">
    import {Game} from "$lib/logic";
    import Cell from "$lib/Cell.svelte";

    const game = new Game();

    let board = game.getBoard();

    function handleKeydown(event: KeyboardEvent) {
        let pressedKey: string = event.key;
        console.log(pressedKey);
        game.move(pressedKey);
        board = game.getBoard();
        if (game.checkForWin()) {
            alert("You win!");
        }

        if (game.checkForLose()) {
            alert("You lose!");
        }
    }

</script>
<div class="container">
    <div class="heading">
        <div class="title"></div>
        <div class="subtitle">
            <div class="new-game"></div>
            <div class="high-scores"></div>
        </div>
    </div>
    <div class="game">
        <div class="game-board">
            {#each board as cell}
                <Cell value={cell.toString()} />
            {/each}
            <!--<div class="grid-cell"></div>
            <div class="grid-cell"></div>
            <div class="grid-cell"></div>
            <div class="grid-cell"></div>
            <div class="grid-cell"></div>
            <div class="grid-cell"></div>
            <div class="grid-cell"></div>
            <div class="grid-cell"></div>
            <div class="grid-cell"></div>
            <div class="grid-cell"></div>
            <div class="grid-cell"></div>
            <div class="grid-cell"></div>
            <div class="grid-cell"></div>
            <div class="grid-cell"></div>
            <div class="grid-cell"></div>
            <div class="grid-cell"></div>-->
        </div>
        <!--<div class="game-info" style="position: absolute;bottom:0;">
            <button on:click={lastPosition}>Last</button>
        </div>-->
    </div>
</div>

<svelte:window on:keydown={handleKeydown} />