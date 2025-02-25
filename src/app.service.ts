import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosError, AxiosResponse } from 'axios';
import { lastValueFrom } from 'rxjs';
import * as fs from 'fs';

@Injectable()
export class AppService {
  public constructor(private readonly HttpService: HttpService) {}

  public async getInfo(battletag: string): Promise<object> {
    const apiURL = 'https://overfast-api.tekrop.fr/players/' + battletag + '/summary';
    let datas = {};

    await lastValueFrom(this.HttpService.get(apiURL))
      .then((response: AxiosResponse) => {
        datas = response.data;
      })
      .catch((error: AxiosError) => {
        console.log(error.response.statusText);
      });

    return datas;
  }

  public getTiers(data: object) {
    let datas = { tank: '', damage: '', support: '' };

    if (data['competitive'] == null) {
      return datas;
    }

    const tank = data['competitive']['pc']['tank'];
    const damage = data['competitive']['pc']['damage'];
    const support = data['competitive']['pc']['support'];

    if (tank != null) datas['tank'] = tank['rank_icon'];
    if (damage != null) datas['damage'] = damage['rank_icon'];
    if (support != null) datas['support'] = support['rank_icon'];

    return datas;
  }

  public getTierNames(data: object) {
    let datas = { tank: '', damage: '', support: '' };

    if (data['competitive'] == null) {
      return datas;
    }

    const tank = data['competitive']['pc']['tank'];
    const damage = data['competitive']['pc']['damage'];
    const support = data['competitive']['pc']['support'];

    if (tank != null) datas['tank'] = tank['division'];
    if (damage != null) datas['damage'] = damage['division'];
    if (support != null) datas['support'] = support['division'];

    return datas;
  }

  public setBoxShadow(tier: string) {
    let color = '';

    if (tier == 'grandmaster') color = '#2EFEF7';
    else if (tier == 'master') color = '#FFFF00';
    else if (tier == 'diamond') color = '#0080FF';
    else if (tier == 'platinum') color = '#009999';
    else return ``;

    return `
      0%, 50% {
        filter: drop-shadow(0px 0px 0px #000);
      }
      100% {
        filter: drop-shadow(0px 0px 20px ${color})
        drop-shadow(0px 0px 25px #FFF);
      }`;
  }

  public toBase64(filePath: fs.PathOrFileDescriptor): string {
    const img = fs.readFileSync(filePath);
    return Buffer.from(fs.readFileSync(filePath)).toString('base64');
  }

  public getSvgToBase64(position: string): string {
    const base64String = this.toBase64(__dirname + '/../public/image/' + position + '.svg');
    return base64String;
  }

  public async getImageToBase64(url: string): Promise<string> {
    let datas = '';

    await lastValueFrom(this.HttpService.get(url, { responseType: 'arraybuffer' }))
      .then((response: AxiosResponse) => {
        datas = response.data;
      })
      .catch((error: AxiosError) => {
        console.log(error.response.statusText);
      });

    const base64String = Buffer.from(datas).toString('base64');
    return base64String;
  }

  public async getCard(battletag: string): Promise<string> {
    const data = await this.getInfo(battletag);

    const avatar = await this.getImageToBase64(data['avatar']);
    const namecard = await this.getImageToBase64(data['namecard']);

    const getTier = this.getTiers(data);
    const tank = getTier['tank'] != '' ? await this.getImageToBase64(getTier['tank']) : '';
    const damage = getTier['damage'] != '' ? await this.getImageToBase64(getTier['damage']) : '';
    const support = getTier['support'] != '' ? await this.getImageToBase64(getTier['support']) : '';

    const getTierName = this.getTierNames(data);
    const tankN = getTierName['tank'];
    const damageN = getTierName['damage'];
    const supportN = getTierName['support'];

    return `
    <svg width="540" height="120" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 540 120">
      <defs>
        <style>
        <![CDATA[
        .position {
          animation: position_fade 3s infinite alternate;
        }
        .tank_tier {
          animation: tank_fade 3s infinite alternate;
        }
        .damage_tier {
          animation: damage_fade 3s infinite alternate;
        }
        .support_tier {
          animation: support_fade 3s infinite alternate;
        }
        @keyframes position_fade {
          0%, 50% {
            filter: drop-shadow(0px 0px 0px #000);
          }
          100% {
            filter: drop-shadow(0px 0px 10px black)
            drop-shadow(0px 0px 25px black);
          }
        }
        @keyframes tank_fade {
          ${this.setBoxShadow(tankN)}
        }
        @keyframes damage_fade {
          ${this.setBoxShadow(damageN)}
        }
        @keyframes support_fade {
          ${this.setBoxShadow(supportN)}
        }
        ]]>
        </style>
      </defs>
      <!-- <rect x="10" y="10" rx="5" ry="5" fill="#BDBDBD" width="520" height="100"/> -->
      <image x="10" y="10" clip-path="inset(0% round 6px)" width="520" href="data:image/png;base64,${namecard}" />
      <!-- <text x="258" y="99" fill="white" font-weight="bold">돌격</text>
      <text x="358" y="99" fill="white" font-weight="bold">공격</text>
      <text x="458" y="99" fill="white" font-weight="bold">지원</text> -->
      <g transform="translate(277, 89)">
        <image class="position" href="data:image/svg+xml;base64,${this.getSvgToBase64('tank')}" height="15" width="15" />
      </g>
      <g transform="translate(377, 89)">
        <image class="position" href="data:image/svg+xml;base64,${this.getSvgToBase64('damage')}" height="15" width="15" />
      </g>
      <g transform="translate(477, 89)">
        <image class="position" href="data:image/svg+xml;base64,${this.getSvgToBase64('support')}" height="15" width="15" />
      </g>
      <g transform="translate(249, 15)">
        ${tank != '' ? '<image class="tank_tier" href="data:image/png;base64,' + tank + '" height="70" width="70" />' : ''}
      </g>
      <g transform="translate(349, 15)">
        ${damage != '' ? '<image class="damage_tier" href="data:image/png;base64,' + damage + '" height="70" width="70" />' : ''}
      </g>
      <g transform="translate(449, 15)">
        ${support != '' ? '<image class="support_tier" href="data:image/png;base64,' + support + '" height="70" width="70" />' : ''}
      </g>
      <!-- <g transform="translate(16, 12)">
        <svg xmlns="http://www.w3.org/2000/svg" width="74" height="74" fill="none" viewBox="0 0 48 48" part="icon blz-icon">
          <path fill="#ED6516" d="M13.9 13.901a14.284 14.284 0 0 1 20.2 0l4.043-4.042a20 20 0 0 0-28.286 0L13.9 13.9"></path>
          <path fill="#333E48" d="m39.312 11.135-4.063 4.062a14.288 14.288 0 0 1 .995 16.159L28.891 24l-4.006-9.413h-.02V27.31l7.938 7.938a14.289 14.289 0 0 1-17.606 0l7.939-7.938V14.636l-4.027 9.365-7.355 7.355a14.292 14.292 0 0 1 .997-16.159l-4.063-4.062a20.001 20.001 0 1 0 30.624 0"></path>
        </svg>
      </g> -->
      <g transform="translate(22, 20)">
        <image href="data:image/png;base64,${avatar}" height="60" width="60" clip-path="inset(0% round 10px)" />
      </g>
      <!-- <g transform="translate(22, 20)">
        <image href="ow2.png" height="60" width="60" clip-path="inset(0% round 10px)" />
      </g> -->
      <text x="21" y="103" fill="white" font-weight="bold">${battletag.replace('-', '#')}</text>
    </svg>`;
  }
}
