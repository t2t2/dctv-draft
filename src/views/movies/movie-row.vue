<template>
	<tr>
		<th>{{ movie.name }}</th>
		<td>
			<BaseFormattedDate
				:value="movie.releaseDate"
			/>
		</td>
		<td>
			<a :href="movie.bomUrl" target="_blank" rel="noopener noreferrer">{{ bomText }}</a>
		</td>
		<template v-if="movie.owner">
			<td>
				{{ movie.owner }}
			</td>
			<td class="has-text-right">
				<BaseFormattedMoney :value="movie.price" />
			</td>
		</template>
		<td
			v-else
			colspan="2"
		>
			<em>Nobody</em>
		</td>
		<td class="has-text-right">
			<BaseFormattedDollars :value="movie.gross" />
		</td>
		<td class="has-text-right">
			<BaseFormattedDollars
				:value="movie.grossPerPrice"
			/>
		</td>
	</tr>
</template>

<script>
import BaseFormattedDate from '@/components/base-formatted-date'
import BaseFormattedDollars from '@/components/base-formatted-dollars'
import BaseFormattedMoney from '@/components/base-formatted-money'

export default {
	components: {
		BaseFormattedDate,
		BaseFormattedDollars,
		BaseFormattedMoney
	},
	props: {
		movie: {
			type: Object,
			required: true
		}
	},
	computed: {
		bomText() {
			const {bomUrl} = this.movie
			return bomUrl.substring(Math.max(0, bomUrl.indexOf('?id=') + 4))
		}
	}
}
</script>
